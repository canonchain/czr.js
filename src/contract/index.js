/**
 * To initialize a contract use:
 *
 *  var Contract = require('web3-eth-contract');
 *  Contract.setProvider('ws://localhost:8546');
 *  var contract = new Contract(abi, account, ...)
 */
"use strict";
//RPC通信
const url = require('url');
let HttpRequest = require('../httprequest');
let request;
// **************
let utils = require("../utils/")
let abi = require("../abi/")

/**
 * 使用下面方法
 * utils._jsonInterfaceMethodToString   //添加到CZR util
 * utils._fireError                     //添加到CZR util
 * utils.isAccount(args.options.from)   //添加到CZR util
 * 
 * 使用下面方法
 * abi.encodeFunctionSignature(funcName);
 * abi.encodeEventSignature(funcName);
 * abi.encodeParameters(inputs, args)
 * abi.decodeLog(event.inputs, data.data, argTopics);
 * abi.decodeParameters(outputs, returnValues);
 */


/**
 * 使用时候需要创建实例
 *
 * @method Contract
 * @constructor
 * @param {Array} jsonInterface
 * @param {String} account
 * @param {Object} options
 */
var Contract = function Contract (jsonInterface, account, options) {
    var _this = this,
        args = Array.prototype.slice.call(arguments);
    //判断原型是不是在Contract
    if (!(this instanceof Contract)) {
        throw new Error('Please use the "new" keyword to instantiate a contract object!');
    }
    //判断jsonInterface
    if (!jsonInterface || !(Array.isArray(jsonInterface))) {
        throw new Error('You must provide the json interface of the contract when instantiating a contract object.');
    }

    // create the options object
    this.options = {};
    this.methods = {};

    //处理赋参数；options 和 合约账号
    var lastArg = args[args.length - 1];
    if (utils.judge(lastArg) === 'object') {
        options = lastArg;
        this.options = Object.assign(this.options, this._getOrSetDefaultOptions(options));
        //初始化ads
        if (utils.judge(account) === 'object') {
            account = null;
        }
    }

    this._account = null;
    this._jsonInterface = [];

    // get default account from the mci
    var defaultMci = this.constructor.defaultMci || 'latest';
    Object.defineProperty(this, 'defaultMci', {
        get: function () {
            return defaultMci;
        },
        set: function (val) {
            if (val) {
                defaultMci = val;
            }
            return defaultMci;
        },
        enumerable: true
    });

    // 在 this.options 上设置 账户
    Object.defineProperty(this.options, 'account', {
        set: function (value) {
            if (value) {
                _this._account = value;
            }
            return _this._account;
        },
        get: function () {
            return _this._account;
        },
        enumerable: true
    });

    // 在 this.options 上设置 jsonInterface
    Object.defineProperty(this.options, 'jsonInterface', {
        set: function (value) {
            _this.methods = {};//所有的methods
            _this._jsonInterface = value.map(function (method) {
                var func,//函数名
                    funcName;//方法名

                // make constant and payable backwards compatible
                //判断是否可变 和 是否可以付钱
                method.constant = (method.stateMutability === "view" || method.stateMutability === "pure" || method.constant);
                method.payable = (method.stateMutability === "payable" || method.payable);

                //方法名
                if (method.name) {
                    funcName = utils._jsonInterfaceMethodToString(method);//带类型的函数 testCall2(uint256,uint256)
                }

                // function
                if (method.type === 'function') {
                    method.signature = abi.encodeFunctionSignature(funcName);//a()
                    // console.log("method.signature", method.signature);

                    func = _this._createTxObject.bind({
                        method: method,
                        parent: _this
                    });//用来赋值给XXX

                    // 仅当不存在添加方法时
                    if (!_this.methods[method.name]) {
                        _this.methods[method.name] = func;
                    } else {
                        //有相同的 method.name,支持相同method.name不同参数的设置
                        var cascadeFunc = _this._createTxObject.bind({
                            method: method,
                            parent: _this,
                            nextMethod: _this.methods[method.name]
                        });
                        _this.methods[method.name] = cascadeFunc;
                    }

                    _this.methods[method.signature] = func;
                    _this.methods[funcName] = func;
                } else if (method.type === 'event') {
                    // event
                    method.signature = abi.encodeEventSignature(funcName);
                }
                return method;
            });
            return _this._jsonInterface;
        },
        get: function () {
            return _this._jsonInterface;
        },
        enumerable: true
    });

    // set getter/setter properties
    this.options.account = account;
    this.options.jsonInterface = jsonInterface;
};

/**
 * 克隆
 * @method clone
 * @return {Object} the event subscription
 */
Contract.prototype.clone = function () {
    return new this.constructor(this.options.jsonInterface, this.options.account, this.options);
};

/**
 * 部署
 * @method deploy
 * @param {Object} options
 * @return {Object} EventEmitter possible events are "error", "transactionHash" and "receipt"
 */
Contract.prototype.deploy = function (options) {
    options = options || {};
    options.arguments = options.arguments || [];
    options = this._getOrSetDefaultOptions(options);

    //如果未指定“数据”，则返回错误
    if (!options.data) {
        return utils._fireError(new Error('No "data" specified in neither the given options, nor the default options.'), null, null, callback);
    }
    //查找constructor ， 如果没有则为{}
    var constructor = this.options.jsonInterface.find(function (method) {
        return (method.type === 'constructor');
    }) || {};
    constructor.signature = 'constructor';

    // console.log(" -------- deploy -------- ")
    // console.log("constructor", constructor)
    // console.log('options.data ==> ', options.data)
    // console.log('this.constructor._czrAccounts ==> ', this.constructor._czrAccounts)
    // console.log('options.arguments ==> ', options.arguments)
    // console.log(" -------- deploy --------  \n");
    return this._createTxObject.apply({
        method: constructor,
        parent: this,
        deployData: options.data,
        _czrAccounts: this.constructor._czrAccounts
    }, options.arguments);
};

/**
 * 返回一个带有 call sendBlock encodeABI functions 的对象
 * @method createTxObject
 * @returns {Object} an object with functions to call the methods
 */
Contract.prototype._createTxObject = function () {
    var args = Array.prototype.slice.call(arguments);//转为数组
    var txObject = {
        'tag': "Canonchain"
    };

    //encode
    txObject.encodeABI = this.parent._encodeMethodABI.bind(txObject);//转出bytecode

    if (this.method.type === 'function') {
        txObject.call = this.parent._getRpc.bind(txObject, 'call');
        txObject.call.request = this.parent._getRpc.bind(txObject, 'call', true); // to make batch requests
    }
    txObject.sendBlock = this.parent._getRpc.bind(txObject, 'send');//CZR sendBlock的方法
    txObject.sendBlock.request = this.parent._getRpc.bind(txObject, 'send', true); // to make batch requests


    if (args && this.method.inputs && args.length !== this.method.inputs.length) {
        if (this.nextMethod) {
            return this.nextMethod.apply(null, args);
        }

        throw `
            args_length: ${args.length},
            method_inputs_length: ${this.method.inputs.length},
            method_name: ${this.method.name}
        `

    }

    txObject.arguments = args || [];
    txObject._method = this.method;
    txObject._parent = this.parent;
    txObject._czrAccounts = this.parent.constructor._czrAccounts || this._czrAccounts;
    if (this.deployData) {
        txObject._deployData = this.deployData;
    }
    return txObject;
};

/**
 * 为方法编码ABI，包括签名或方法。或者当构造函数仅编码构造函数参数时。
 * 基于ABI来做bytycode
 * 
 * @method _encodeMethodABI
 * @param {Mixed} args the arguments to encode
 * @param {String} the encoded ABI
 */
Contract.prototype._encodeMethodABI = function () {
    // this有 call send _deployData
    var methodSignature = this._method.signature,
        args = this.arguments || [];//传的参数 [ 0, 1 ]
    var signature = false;
    var paramsABI = this._parent.options.jsonInterface.filter(function (json) {
        return ((methodSignature === 'constructor' && json.type === methodSignature) ||
            ((json.signature === methodSignature || json.signature === methodSignature.replace('0x', '') || json.name === methodSignature) && json.type === 'function'));
    }).map(function (json) {
        // console.log("json", json)
        var inputLength = (utils.judge(json.inputs) === 'array') ? json.inputs.length : 0;
        if (inputLength !== args.length) {
            throw new Error('The number of arguments is not matching the methods required number. You need to pass ' + inputLength + ' arguments.');
        }
        if (json.type === 'function') {
            signature = json.signature;
        }
        return (utils.judge(json.inputs) === 'array') ? json.inputs : [];
    }).map(function (inputs) {
        // console.log("___encodeParameters",inputs, args)
        // console.log("___encodeParameters",abi.encodeParameters(inputs, args).replace('0x', ''))
        // return abi.encodeParameters(inputs, args).replace('0x', '');
        // old
        // return abi.encodeParameters(inputs, args).replace('0x', '');
        return utils.encode.parse(
            { funArgs: args },
            { inputs: inputs }
        ).replace('0x', '');
    })[0] || '';//方法和参数转成16进制
    // return constructor
    if (methodSignature === 'constructor') {
        //部署的时候
        if (!this._deployData) {
            throw new Error('The contract has no contract data option set. This is necessary to append the constructor parameters.');
        }
        return this._deployData + paramsABI;
    } else {
        var returnValue = (signature) ? signature + paramsABI : paramsABI;
        if (!returnValue) {
            throw new Error('Couldn\'t find a matching contract method named "' + this._method.name + '".');
        } else {
            return returnValue;
        }
    }
};

/**
 * 格式化数据组装(需要上链的参数)
 * @method getOrSetDefaultOptions
 * @param {Object} options the options gived by the user
 * @return {Object} the options with gaps filled by defaults
 */
Contract.prototype._getOrSetDefaultOptions = function (options) {
    // console.log("getOrSetDefaultOptions ===> ", this.options);
    options.from = (options.from ? options.from : null) || this.options.from;
    options.gas_price = (options.gas_price ? String(options.gas_price) : null) || this.options.gas_price;
    options.data = options.data || this.options.data;
    options.gas = options.gas || this.options.gas;
    return options;
};

Contract.setProvider = function (provider, accounts) {
    let parseUrlObj = url.parse(provider);
    let opt = {
        host: parseUrlObj.hostname,
        port: parseUrlObj.port
    }
    request = new HttpRequest(opt);
    this._czrAccounts = accounts;
};

//-------------------------------------------------------------------------------------------

/**
 * 在合约上执行调用，交易
 * 
 * @method _getRpc
 * @param {String} type the type this execute function should execute
 * @param {Boolean} makeRequest if true, it simply returns the request parameters, rather than executing it
 */
Contract.prototype._getRpc = async function () {
    let _this = this;
    //初始化需要调用RPC的参数
    var args = this._parent._setRpcOpt.call(this, Array.prototype.slice.call(arguments));

    // console.log("___getRpc：是否需要请求节点", arguments)
    // console.log("___需要的RPC交互", args)
    // console.log("___outputs", this._method.outputs);

    let argsOpts = args.options;
    switch (args.type) {
        case 'call':
            let callOpts = {
                from: argsOpts.from || '',
                to: argsOpts.to,
                data: argsOpts.data || '',
                mci: argsOpts.mci || ''
            }
            let result = await request.call(callOpts);
            return new Promise(function (resolve, reject) {
                if (result.code === 0) {
                    let beautifyData = _this._parent._decodeMethodReturn(_this._method.outputs, result.output);
                    _this._parent._runCallback(args.callback, null, beautifyData);
                    resolve(beautifyData);
                } else {
                    _this._parent._runCallback(args.callback, new Error('Call Error'));
                    reject(result);
                }
            })

        case 'send':
            let sendOpts = {
                "from": argsOpts.from,
                "to": argsOpts.to || "",
                "amount": argsOpts.amount,
                "password": argsOpts.password,
                "gas": argsOpts.gas,
                "gas_price": argsOpts.gas_price,
                "data": argsOpts.data || '',
                "gen_next_work": argsOpts.gen_next_work || '',
                "id": argsOpts.id || '',
                "previous": argsOpts.previous || ''
            }
            // console.log(request);
            let sendResult = await request.sendBlock(sendOpts);
            return new Promise(function (resolve, reject) {
                // 返回
                if (sendResult.code !== 0) {
                    _this._parent._runCallback(args.callback, new Error("Send Error"))
                    reject(sendResult);
                }
                _this._parent._runCallback(args.callback, null, sendResult.hash);

                //再次获取
                let searchRes;
                let searchTimer = null;
                let startSearchTimer;
                let startSearchHash = async function () {
                    //上面已做过判断，必定会有hash
                    searchRes = await request.getBlockState(sendResult.hash);
                    if (searchRes.code !== 0) {
                        reject(searchRes);
                    }
                    //判断是否稳定
                    if (searchRes.block_state.is_stable === 0) {
                        //不稳定,再次获取
                        await startSearchTimer();
                    }

                    //稳定开始获取block
                    let blockResInfo = await request.getBlock(sendResult.hash);
                    if (blockResInfo.code !== 0) {
                        reject(blockResInfo);
                    }
                    if (searchRes.block_state.is_stable === 1) {
                        let searchResBloState = searchRes.block_state;
                        blockResInfo.block.is_stable = searchResBloState.is_stable;
                        blockResInfo.block.stable_content = searchResBloState.stable_content;
                        blockResInfo.block.content.level = searchResBloState.content.level;
                        resolve(blockResInfo);
                    }
                }
                startSearchTimer = async function () {
                    searchTimer = await setTimeout(startSearchHash, 1000);
                }
                startSearchTimer();
            })
    }
};


/**
 * 生成执行调用的选项   1
 * @method setRpcOpt
 * @param {Array} args
 * @param {Promise} defer
 */
Contract.prototype._setRpcOpt = function (args, defer) {
    var processedArgs = {};
    // console.log(`-----args1,${args}`)
    processedArgs.type = args.shift();
    // console.log(`-----args2,${args}, ${processedArgs.type}`)
    // get the callback
    processedArgs.callback = this._parent._getCallback(args);

    // get block number to use for call
    if (
        processedArgs.type === 'call' &&
        args[args.length - 1] !== true &&
        (
            (utils.judge(args[args.length - 1]) === 'string') ||
            isFinite(args[args.length - 1])
        )
    ) {
        processedArgs.defaultMci = args.pop();
    }


    // get the options
    processedArgs.options = (utils.judge(args[args.length - 1]) === 'object') ? args.pop() : {};
    processedArgs.options = this._parent._getOrSetDefaultOptions(processedArgs.options);
    processedArgs.options.data = this.encodeABI();


    // add contract account
    if (!this._deployData && !utils.isAccount(this._parent.options.account)) {
        throw new Error('This contract object doesn\'t have account set yet, please set an account first.');
    }

    //如果没有部署的合约，就传入的ads当做一个需要调用的合约来使用
    if (!this._deployData) {
        processedArgs.options.to = this._parent.options.account;
    }

    // 如果未指定“数据”，则返回错误
    if (!processedArgs.options.data) {
        return utils._fireError(new Error('Couldn\'t find a matching contract method, or the number of parameters is wrong.'), defer.eventEmitter, defer.reject, processedArgs.callback);
    }
    return processedArgs;
};


/**
 * 获取回调并在必要时修改数组
 * 
 * @method _getCallback
 * @param {Array} args
 * @return {Function} the callback
 */
Contract.prototype._getCallback = function (args) {
    if (args && (utils.judge(args[args.length - 1]) === 'function')) {
        return args.pop(); // modify the args array!
    }
};

/** */

Contract.prototype._runCallback = function (callFn, error, data) {
    if (utils.judge(callFn) === 'function') {
        callFn(error, data)
    }
};


// 解吗返回的结果
Contract.prototype._decodeMethodReturn = function (outputs, returnValues) {
    // console.log("这是解码的方法啊")
    //[ { name: '', type: 'uint256' }, { name: '', type: 'uint256' } ] 
    //'0x000000000000000000000000000000000000000000000000000000000000006e0000000000000000000000000000000000000000000000000000000000000077'
    // console.log(outputs);
    // console.log(returnValues);

    if (!returnValues) {
        return null;
    }
    // returnValues = returnValues.length >= 2 ? returnValues.slice(2) : returnValues;
    returnValues = returnValues.indexOf("0x") === -1 ? "0x" + returnValues : returnValues;
    var result = abi.decodeParameters(outputs, returnValues);//可以用decode来解析
    // console.log(result);
    if (result.__length__ === 1) {
        return result[0];
    } else {
        delete result.__length__;
        return result;
    }
};

/**
 * Get past events from contracts
 *
 * @method getPastEvents
 * @param {String} event
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} the promievent
 */
Contract.prototype.getPastEvents = function (eventName, options) {
    // console.log(eventName, options);
    var subOptions = this._generateEventOptions.apply(this, arguments);
    // console.log("subOptions", subOptions)
    let curTopic = [];
    subOptions.params.topics.forEach(item => {
        curTopic.push(item.indexOf("0x") === 0 ? item.slice(2) : item)
    })

    let opt = {
        "from_stable_block_index": options.from_stable_block_index || 0,
        "to_stable_block_index": options.to_stable_block_index,
        "account": subOptions.params.account || '',
        "topics": curTopic || ''
    }
    // console.log("opt", opt);
    return request.logs(opt);
};
/**
 * Gets the event signature and outputformatters
 *
 * @method generateEventOptions
 * @param {Object} event
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} the event options object
 */
Contract.prototype._generateEventOptions = function () {
    var args = Array.prototype.slice.call(arguments);

    // get the callback
    var callback = this._getCallback(args);

    // get the options
    var options = (utils.judge(args[args.length - 1]) === 'object') ? args.pop() : {};

    var event = (utils.judge(args[0]) === 'string') ? args[0] : 'allevents';

    event = (event.toLowerCase() === 'allevents') ? {
        name: 'ALLEVENTS',
        jsonInterface: this.options.jsonInterface
    } : this.options.jsonInterface.find(function (json) {
        return (json.type === 'event' && (json.name === event || json.signature === '0x' + event.replace('0x', '')));
    });

    if (!event) {
        throw new Error('Event "' + event.name + '" doesn\'t exist in this contract.');
    }

    if (!utils.isAccount(this.options.account)) {
        throw new Error('This contract object doesn\'t have account set yet, please set an account first.');
    }

    return {
        params: this._encodeEventABI(event, options),
        event: event,
        callback: callback
    };
};

/**
 * Should be used to encode indexed params and options to one final object
 *
 * @method _encodeEventABI
 * @param {Object} event
 * @param {Object} options
 * @return {Object} everything combined together and encoded
 */
Contract.prototype._encodeEventABI = function (event, options) {
    options = options || {};
    var filter = options.filter || {},
        result = {};

    // use given topics
    if (utils.judge(options.topics) === 'array') {
        result.topics = options.topics;
        // create topics based on filter
    } else {
        result.topics = [];
        // add event signature
        if (event && !event.anonymous && event.name !== 'ALLEVENTS') {
            result.topics.push(event.signature);
        }
        // add event topics (indexed arguments)
        // console.log("event.name", event.name)
        // console.log("event.inputs", event.inputs)
        if (event.name !== 'ALLEVENTS') {
            var indexedTopics = event.inputs.filter(function (i) {
                return i.indexed === true;
            }).map(function (i) {
                var value = filter[i.name];
                if (!value) {
                    return null;
                }
                // TODO: https://github.com/ethereum/web3.js/issues/344
                // TODO: deal properly with components
                if (utils.judge(value) === 'array') {
                    return value.map(function (v) {
                        return abi.encodeParameter(i.type, v);
                    });
                }
                return abi.encodeParameter(i.type, value);
            });
            result.topics = result.topics.concat(indexedTopics);
        }
        // if (!result.topics.length) {
        //     delete result.topics;
        // }
    }
    if (this.options.account) {
        result.account = this.options.account;
    }
    return result;
};


//******************************************************************************************* */
module.exports = Contract;