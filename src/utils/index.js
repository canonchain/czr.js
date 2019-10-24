let BigNumber = require('bignumber.js').default;
let bs58check = require("bs58check");
let Hash = require("./lib/hash");


let unitMap = {
    'none': '0',
    'None': '0',
    'king': '1',
    'King': '1',
    'kking': '1000',
    'Kking': '1000',
    'mking': '1000000',
    'Mking': '1000000',
    'gking': '1000000000',
    'Gking': '1000000000',
    'czr': '1000000000000000000',
    'CZR': '1000000000000000000',
};

let decode = require("./helper/decode");

let encode = require("./helper/encode");
// let encode = {};

let encode_account = function (pub) {
    pub = Buffer.from(pub, "hex");
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    return "czr_" + bs58check.encode(v_pub);
}

let isString = function (obj) {
    return typeof obj === 'string' && obj.constructor === String;
};

let isBigNumber = function (object) {
    return (object && object.constructor && object.constructor.name === 'BigNumber');
};

let toBigNumber = function (number) {
    number = number || 0;
    if (isBigNumber(number)) {
        return number;
    }
    if (isString(number) && (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
        return new BigNumber(number.replace('0x', ''), 16);
    }
    return new BigNumber(number.toString(10), 10);
};

let getValueOfUnit = function (unit) {
    unit = unit ? unit.toLowerCase() : 'czr';
    let unitValue = unitMap[unit];
    if (unitValue === undefined) {
        throw new Error('This unit doesn\'t exists, please use the one of the following units' + JSON.stringify(unitMap, null, 2));
    }
    return new BigNumber(unitValue, 10);
};

let fromKing = function (number, unit) {
    let returnValue = toBigNumber(number).dividedBy(getValueOfUnit(unit));
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

let fromKingToken = function (number, precision) {
    let returnValue = toBigNumber(number).dividedBy(precision);
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

let toKing = function (number, unit) {
    let returnValue = toBigNumber(number).times(getValueOfUnit(unit));
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

// 判断账户是否合法
let isAccount = function (act) {
    if (!act) { return false }
    return true;
}

//判断数据类型
let judge = function (data) {
    let value = /\[object (\w+)\]/.exec(Object.prototype.toString.call(data));
    return value ? value[1].toLowerCase() : '';
}


//处理错误
let _fireError = function (error, emitter, reject, callback) {
    // add data if given
    if (judge(error) === 'object' && !(error instanceof Error) && error.data) {
        if (judge(error.data) === 'object' || judge(error.data) === 'array') {
            error.data = JSON.stringify(error.data, null, 2);
        }
        error = error.message + "\n" + error.data;
    }

    if (judge(error) === 'string') {
        error = new Error(error);
    }

    if (judge(callback) === 'function') {
        callback(error);
    }
    if (judge(reject) === 'function') {
        if (
            emitter &&
            (judge(emitter.listeners) === 'function' && emitter.listeners('error').length) ||
            (judge(callback) === 'function')
        ) {
            emitter.catch(function () { });
        }
        setTimeout(function () {
            reject(error);
        }, 1);
    }

    if (emitter && judge(emitter.emit) === 'function') {
        // emit later, to be able to return emitter
        setTimeout(function () {
            emitter.emit('error', error);
            emitter.removeAllListeners();
        }, 1);
    }
    return emitter;
};


//接口转字符串
let _jsonInterfaceMethodToString = function (json) {
    //是对象，并且有json name，并且是函数
    if (judge(json) === 'object' && json.name && json.name.indexOf('(') !== -1) {
        return json.name;
    }
    return json.name + '(' + _flattenTypes(false, json.inputs).join(',') + ')';
}

let _flattenTypes = function (includeTuple, puts) {
    // console.log("entered _flattenTypes. inputs/outputs: " + puts)
    var types = [];

    puts.forEach(function (param) {
        if (judge(param.components) === 'object') {
            if (param.type.substring(0, 5) !== 'tuple') {
                throw new Error('components found but type is not tuple; report on GitHub');
            }
            var suffix = '';
            var arrayBracket = param.type.indexOf('[');
            if (arrayBracket >= 0) {
                suffix = param.type.substring(arrayBracket);
            }
            var result = _flattenTypes(includeTuple, param.components);
            // console.log("result should have things: " + result)
            if (judge(error.data) === 'array' && includeTuple) {
                // console.log("include tuple word, and its an array. joining...: " + result.types)
                types.push('tuple(' + result.join(',') + ')' + suffix);
            } else if (!includeTuple) {
                // console.log("don't include tuple, but its an array. joining...: " + result)
                types.push('(' + result.join(',') + ')' + suffix);
            } else {
                // console.log("its a single type within a tuple: " + result.types)
                types.push('(' + result + ')');
            }
        } else {
            // console.log("its a type and not directly in a tuple: " + param.type)
            types.push(param.type);
        }
    });
    return types;
}

const SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
let sha3 = function (value) {
    if (isBigNumber(value)) {
        value = value.toString();
    }

    if (isHexStrict(value) && /^0x/i.test((value).toString())) {
        value = hexToBytes(value);
    }

    var returnValue = Hash.keccak256(value); // jshint ignore:line

    if (returnValue === SHA3_NULL_S) {
        return null;
    } else {
        return returnValue;
    }
};
// expose the under the hood keccak256
sha3._Hash = Hash;

//检查字符串是否为十六进制，前面需要0x
let isHexStrict = function (hex) {
    return ((judge(hex) === 'string' || judge(hex) === 'number') && /^(-)?0x[0-9a-f]*$/i.test(hex));
};
/**
 *将十六进制字符串转换为字节数组
 *注意：从crypto-js实现
 */
let hexToBytes = function (hex) {
    hex = hex.toString(16);

    if (!isHexStrict(hex)) {
        throw new Error('Given value "' + hex + '" is not a valid hex string.');
    }

    hex = hex.replace(/^0x/i, '');

    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
};


module.exports = {
    isAccount: isAccount,
    _fireError: _fireError,
    _jsonInterfaceMethodToString: _jsonInterfaceMethodToString,

    toBigNumber: toBigNumber,
    isBigNumber: isBigNumber,

    encode: encode,
    decode: decode,
    encode_account: encode_account,
    fromKing: fromKing,
    fromKingToken: fromKingToken,
    toKing: toKing,
    judge: judge,
    sha3: sha3
};