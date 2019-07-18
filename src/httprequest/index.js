"use strict";
// let rpc     = require('node-json-rpc');
let rpc = require('./rpc-main');
let options = require("./config");

let HttpRequest = function (host, timeout, apiVersion) {
    this.hostCon = host || options;
    // this.timeout = timeout || 0;
    // this.apiVersion = apiVersion || "v1";
};


let client = new rpc.Client(options);

function asyncfunc(opt) {
    return new Promise((resolve, reject) => {
        client.call(opt,
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            }
        );
    })
}


HttpRequest.prototype.client = client;
/* 

        return 100//没有第一个参数
        return 101 //没有第二个参数

*/


// Account Start

/**
 * 生成账户。enable_control 需要设置true。
 * @param {string} pwd - 生成账户的密码
 * @param {number} [gen_next_work] - （可选）是否为生成账户的第一笔交易预生成work值，0：不预生成，1：预生成。默认为1。
 * @returns {Promise<{code, msg}>}
 * */
HttpRequest.prototype.accountCreate = async function (pwd, gen_next_work) {
    if (!pwd) {
        return { code: 100, msg: 'no param - pwd' }
    }
    if (gen_next_work !== 0) {
        gen_next_work = 1
    }
    let opt = {
        "action": "account_create",
        "password": pwd,
        "gen_next_work": gen_next_work
    };
    return await asyncfunc(opt);
};

/**
 * 删除账户。enable_control 需要设置true。
 * @param {string} account - 删除的账户
 * @param {string} pwd - 密码
 * @returns {Promise<{code, msg}>}
 * */
HttpRequest.prototype.accountRemove = async function (account, pwd) {
    if (!account) {
        return { code: 100, msg: 'no param - account' }
    }
    if (!pwd) {
        return { code: 100, msg: 'no param - pwd' }
    }
    let opt = {
        "action": "account_remove",
        "account": account,
        "password": pwd
    };
    return await asyncfunc(opt);
};

/**
 * 解锁账户, enable_control 需要设置true.
 * @param {string} account - 解锁的账户
 * @param {string} pwd - 密码
 * @returns {Promise<{code,msg}>} - `{"code": 0,"msg": "OK"}` for success
 * */
HttpRequest.prototype.accountUnlock = async function (account, pwd) {
    if (!account) {
        return { code: 100, msg: 'no param - account' }
    }
    if (!pwd) {
        return { code: 100, msg: 'no param - pwd' }
    }
    let opt = {
        "action": "account_unlock",
        "account": account,
        "password": pwd
    };
    return await asyncfunc(opt);
}

/**
 * 锁定账户。enable_control 需要设置true。
 * @param {string} account - 锁定的账户
 * @returns {Promise<{code, msg}>} - `{"code": 0,"msg": "OK"}` for success
 * */
HttpRequest.prototype.accountLock = async function (account) {
    if (!account) {
        return { code: 100, msg: 'no param - account' }
    }
    let opt = {
        "action": "account_lock",
        "account": account
    };
    return await asyncfunc(opt);
}

/**
 * 导入账户。enable_control 需要设置true。
 * @param {string} jsonFile - 导入账户的json
 * @param {number} [gen_next_work] - （可选）是否为导入账户的第一笔交易预生成work值，0：不预生成，1：预生成。默认为1。
 * @returns {Promise<{code, msg}>}
 * */
HttpRequest.prototype.accountImport = async function (jsonFile, gen_next_work) {
    if (!jsonFile) {
        return { code: 100, msg: 'no param - jsonFile' }
    }
    if (gen_next_work !== 0) {
        gen_next_work = 1
    }
    let opt = {
        "action": "account_import",
        "json": jsonFile,
        "gen_next_work": gen_next_work
    };
    return await asyncfunc(opt);
};

/**
 * 导出账户
 * @param {string} account - 导出的账户
 * @returns {Promise<{code, msg, json}>} - json: 导出账户的json
 * */
HttpRequest.prototype.accountExport = async function (account) {
    if (!account) {
        return 100
    }
    let opt = {
        "action": "account_export",
        "account": account
    };
    return await asyncfunc(opt);
};

/**
 * 验证账户格式是否合法
 * @param {string} accountVal - 待验证的账户
 * @returns {Promise<{code, msg, valid}>} - valid：验证结果，0：格式不合法，1：格式合法
 * */
HttpRequest.prototype.accountValidate = async function (accountVal) {
    if (!accountVal) {
        return 0
    }
    let opt = {
        "action": "account_validate",
        "account": accountVal
    };
    return await asyncfunc(opt);
};

/**
 * 修改密码。enable_control 需要设置true。
 * @param {string} account - 修改密码的账户
 * @param {string} oldPwd - 账户原密码
 * @param {string} newPwd - 账户新密码
 * @returns {Promise<{code, msg}>}
 * */
HttpRequest.prototype.accountChangePwd = async function (account, oldPwd, newPwd) {
    if (!account || !oldPwd || !newPwd) {
        return { code: 100, msg: 'no param' }
    }
    return await asyncfunc({
        "action": "account_password_change",
        "account": account,
        "old_password": oldPwd,
        "new_password": newPwd
    })
}

/**
 * 获取当前节点的所有账户。enable_control 需要设置true。
 * @returns {Promise<{code, msg, accounts}>} - accounts: {string[]} 账户列表
 * */
HttpRequest.prototype.accountList = async function () {
    let opt = {
        "action": "account_list"
    };
    return await asyncfunc(opt);
};

/**
 * 获取指定账户交易详情。enable_control 需要设置true
 * @param {string} account - 指定查询账户
 * @param {number} [limit] - 返回交易上限，如果超过默认1000，默认1000
 * @param {string} [index] - （可选）当前查询索引，来自返回结果中的next_index，默认为空
 * @returns {Promise<{code, msg, blocks, next_index}>} - blocks: {Array.<Block>} 交易详情列表, next_index: 查询索引
 * */
HttpRequest.prototype.accountBlockList = async function (account, limit, index) {
    if (!account) {
        return { code: 100, msg: 'no param - account' }
    }
    const req = {
        "action": "account_block_list",
        "account": account,
    }
    if (!limit || +limit > 1000) {
        req.limit = 1000
    } else {
        req.limit = limit
    }
    if (index) {
        req.index = index
    }
    return await asyncfunc(req)
}

// Account End


/**
 * 获取指定账户余额
 * @param {string} account - 指定的账户
 * @returns {Promise<{code, msg, balance}>} - balance：{string} 账户余额
 * */
HttpRequest.prototype.accountBalance = async function (account) {
    if (!account) {
        return { code: 100, msg: 'no param - account' }
    }
    let opt = {
        "action": "account_balance",
        "account": account
    };
    return await asyncfunc(opt);
};

/**
 * 获取指定多个账户余额
 * @param {string[]} accountAry - 指定的多个账户
 * @returns {Promise<{code, msg, balances}>} - balances {Object.<string, string>}
 * */
HttpRequest.prototype.accountsBalances = async function (accountAry) {
    if (!accountAry || accountAry.length === 0) {
        return { code: 100, msg: 'no param - accountAry' }
    }
    let opt = {
        "action": "accounts_balances",
        "accounts": accountAry
    };
    return await asyncfunc(opt);
};

/**
 * 返回给定地址的已编译智能合约代码（如果有）
 * @param account
 * @returns {Promise<{code: number, msg: string}>}
 */
HttpRequest.prototype.accountCode = async function (account) {
    if (!account) {
        return { code: 100, msg: 'no param - account' }
    }
    let opt = {
        "action": "account_code",
        "account": account
    };
    return await asyncfunc(opt);
};

/**
 * 发送交易。 enable_control 需要设置true。
 * @param {object} transaction - 交易对象
 * @returns {Promise<{code, msg, hash}>}
 * */
HttpRequest.prototype.sendBlock = async function (transaction) {
    if (!transaction || !transaction.from || !transaction.password) {
        return { code: 100, msg: `no param - transaction ${JSON.stringify(transaction)}` }
    }
    if (!(+transaction.amount >= 0 && +transaction.gas >= 0)) {
        return { code: 110, msg: `transaction not valid - transaction ${JSON.stringify(transaction)}` }
    }
    if (transaction.gen_next_work !== 0) {
        transaction.gen_next_work = 1
    }
    let opt = {
        "action": "send_block",
        "from": transaction.from,
        "to": "",
        "amount": transaction.amount,
        "password": transaction.password,
        "gas": transaction.gas,
        "gas_price": transaction.gas_price,
        "data": transaction.data || '',
        "gen_next_work": transaction.gen_next_work
    };
    if (transaction.to) {
        opt.to = transaction.to;
    }
    if (transaction.id) {
        opt.id = transaction.id;
    }
    if (transaction.previous) {
        opt.previous = transaction.previous;
    }

    return await asyncfunc(opt);
}

/**
 * 生成未签名的交易，返回交易详情。enable_control 需要设置true。
 * @param {object} transaction - 交易对象
 * @returns {Promise<{object}>}
 * */
HttpRequest.prototype.generateOfflineBlock = async function (transaction) {
    if (!transaction || !transaction.from || !transaction.to) {
        return { code: 100, msg: `no param - transaction ${JSON.stringify(transaction)}` }
    }
    if (!(+transaction.amount >= 0 && +transaction.gas >= 0)) {
        return { code: 110, msg: `transaction not valid - transaction ${JSON.stringify(transaction)}` }
    }
    let opt = {
        "action": "generate_offline_block",
        "from": transaction.from,
        "to": transaction.to,
        "amount": transaction.amount, //1CZR
        "gas": transaction.gas,
        "gas_price": transaction.gas_price,
        "data": transaction.data || ''
    };
    if (transaction.previous) {
        opt.previous = transaction.previous;
    }
    return await asyncfunc(opt);
}

/**
 * 发送已签名交易，请求参数来自接口generate_offline_block,返回交易哈希。enable_control 需要设置true。
 * @param {object} block - object returns from generate_offline_block
 * @returns {Promise<{code, msg, hash}>} - hash: 交易哈希
 * */
HttpRequest.prototype.sendOfflineBlock = async function (block) {
    if (!block || !block.from) {
        return { code: 100, msg: `no param - block ${JSON.stringify(block)}` }
    }
    if (!(+block.amount >= 0 && +block.gas >= 0)) {
        return { code: 110, msg: `block not valid - block ${JSON.stringify(block)}` }
    }
    if (block.gen_next_work !== 0) {
        block.gen_next_work = 1
    }
    let opt = {
        "action": "send_offline_block",
        "hash": block.hash,
        "from": block.from,
        "to": block.to,
        "amount": block.amount,
        "gas": block.gas,
        "gas_price": block.gas_price,
        "data": block.data || '',
        "previous": block.previous,

        "exec_timestamp": block.exec_timestamp,
        "work": block.work,
        "signature": block.signature,
        "id": block.id || '',
        "gen_next_work": block.gen_next_work || ''
    }
    if (block.to) {
        opt.to = block.to
    }
    if (block.id) {
        opt.id = block.id
    }
    return await asyncfunc(opt)
}

/**
 * 签名消息
 * @param {string} public_key - 签名公钥
 * @param {string} password - 公钥密码
 * @param {string} msg - 签名的消息
 * @returns {Promise<{code, msg, hash}>} - hash: 交易hash
 * */
HttpRequest.prototype.signMsg = async function (public_key, password, msg) {
    if (!public_key || !password || !msg) {
        return { code: 100, msg: 'no param' }
    }
    return await asyncfunc({
        "action": "sign_msg",
        "public_key": public_key,
        "password": password,
        "msg": msg
    })
}

/* 
发送交易： send()
@parm:
    - from
    - to
    - amount
    - password
    - data:"ssss"
    - id
@return:
     {block:""}
*/
/**
 * @deprecated
 * */
HttpRequest.prototype.send = async function (sendObj) {
    // 这个是老接口；0.9.6r后的节点中作废，改用 send_block
    if (!sendObj) {
        return 0//没有参数
    }
    let opt = {
        "action": "send",
        "from": sendObj.from,
        "amount": sendObj.amount,
        "gas": sendObj.gas,
        "gas_price": sendObj.gas_price,
        "password": sendObj.password,
        "data": sendObj.data || ""
    };
    if (sendObj.to) {
        opt.to = sendObj.to;
    }
    if (sendObj.id) {
        opt.id = sendObj.id;
    }
    return await asyncfunc(opt);
};


/**
 * 获取交易详情
 * @param {string} blockHash - 交易哈希
 * @returns {Promise<{code, msg, block}>} - block {object}
 * */
HttpRequest.prototype.getBlock = async function (blockHash) {
    if (!blockHash) {
        return { code: 100, msg: 'no param - blockHash' }
    }
    let opt = {
        "action": "block",
        "hash": blockHash
    };
    return await asyncfunc(opt);
};

/**
 * 批量获取交易详情
 * @param {string[]} blockHashAry - 交易哈希列表
 * @returns {Promise<{code, msg, blocks}>}  - blocks {object[]}
 * */
HttpRequest.prototype.getBlocks = async function (blockHashAry) {
    if (!blockHashAry || blockHashAry.length === 0) {
        return { code: 100, msg: 'no param - blockHashAry' }
    }
    let opt = {
        "action": "blocks",
        "hashes": blockHashAry
    };
    return await asyncfunc(opt);
};

/**
 * 获取交易状态详情
 * @param blockHash
 * @returns {Promise<{code: number, msg: string}>}
 * https://github.com/canonchain/canonchain/wiki/JOSN-RPC#block_state
 */
HttpRequest.prototype.getBlockState = async function (blockHash) {
    if (!blockHash) {
        return { code: 100, msg: 'no param - blockHash' }
    }
    let opt = {
        "action": "block_state",
        "hash": blockHash
    };
    return await asyncfunc(opt);
};

/**
 * 批量获取交易状态
 * @param blockHashAry
 * @returns {Promise<{code: number, msg: string}>}
 * https://github.com/canonchain/canonchain/wiki/JOSN-RPC#block_states
 */
HttpRequest.prototype.getBlockStates = async function (blockHashAry) {
    if (!blockHashAry || blockHashAry.length === 0) {
        return { code: 100, msg: 'no param - blockHashAry' }
    }
    let opt = {
        "action": "block_states",
        "hashes": blockHashAry
    };
    return await asyncfunc(opt);
};

/*
获取账号列表： blockList()
@parm:
    - amount
    - account
    - limit
@return:当前账号中 稳定的交易（不包含分叉）
     {
        xxxxx:""
        next_inde:""
     }
* */
/**
 * @deprecated
 * */
HttpRequest.prototype.blockList = async function (account, limit, index) {
    let opt;
    if (!account) {
        return 0//没有参数 
    }
    if (!limit) {
        return 1//没有参数 
    }
    if (!index) {
        opt = {
            "action": "block_list",
            "account": account,
            "limit": limit
        };
    } else {
        opt = {
            "action": "block_list",
            "account": account,
            "limit": limit,
            "index": index
        };
    }
    //next_index
    /*
    * From - >
    * */
    return await asyncfunc(opt);
};

//传入的mci值,返回mci下所有block的信息
/*
{
    "action"    :"mci_blocks",
    "mci"       :"121",
    "limit"     :"50",
    "next_index":'',    //第一次传空字符串，后续的值取上一次结果中 next_index
}
->
{
    blocks:[],
    "next_index": "XXX" // ""或者一串字符串,如果 next_index == ""  这个mci下的block请求结束
};
*/
/**
 * @deprecated
 * */
HttpRequest.prototype.mciBlocks = async function (mci, limit, next_index) {
    if (!limit) {
        return 1//没有参数
    }
    let opt;
    if (next_index) {
        opt = {
            "action": "mci_blocks",
            "mci": mci,
            "limit": limit,
            "next_index": next_index
        };
    } else {
        opt = {
            "action": "mci_blocks",
            "mci": mci,
            "limit": limit
        };
    }
    return await asyncfunc(opt);
};

/**
 * 获取已稳定的指定mci下的多笔交易。
 * @param {number} limit - 返回交易上限，如果超过1000，默认1000
 * @param {string} [index] - （可选）当前查询索引，来自返回结果中next_index，默认为空。
 * @returns {Promise<{code, msg, blocks, next_index}>}
 * */
HttpRequest.prototype.stableBlocks = async function (limit, index) {
    if (!limit || limit > 1000) {
        limit = 1000
    }
    let opt;
    if (index === undefined) {
        opt = {
            "action": "stable_blocks",
            "limit": limit,
        }
    } else {
        opt = {
            "action": "stable_blocks",
            "limit": Number(limit),
            "index": Number(index)
        }
    }
    // console.log("stable_blocks opt");
    // console.log(opt);
    return await asyncfunc(opt);
}

//当前不稳定的所有block的信息
/*
{
    "action"    :"unstable_blocks",
    "mci"       :"121",
    "limit"     :"50",
    "next_index":'',    //第一次传空字符串，后续的值取上一次结果中 next_index
}
->
{
    blocks:[],
    "next_index": "XXX" // ""或者一串字符串,如果 next_index == ""  这个mci下的block请求结束
};
*/
/**
 * 返回未稳定交易详情。
 * @param {number} limit - 返回交易上限，如果超过1000，默认1000。
 * @param {string} [index] - （可选）当前查询索引，来自返回结果中的next_index，默认为空。
 * @returns {Promise<{code, msg, blocks, next_index}>}
 * */
HttpRequest.prototype.unstableBlocks = async function (limit, index) {
    if (!limit || limit > 1000) {
        limit = 1000
    }
    let opt;
    if (index === undefined) {
        opt = {
            "action": "unstable_blocks",
            "limit": limit,
        }
    } else {
        opt = {
            "action": "unstable_blocks",
            "limit": limit,
            "index": index
        }
    }
    return await asyncfunc(opt);
};

//最后一个稳定点的mci，block信息
/*
return
    {
        last_stable_mci: 100,
        last_mci:122
    }
*/
/**
 * 获取当前节点的最大稳定主链index，最大主链index。
 * @returns {Promise<{code, msg, last_stable_mci, last_mci}>}
 * */
HttpRequest.prototype.status = async function () {
    let opt = {
        "action": "status"
    };
    return await asyncfunc(opt);
};

/**
 * 获取见证人列表。
 * @returns {Promise<{code, msg, witness_list}>}
 * */
HttpRequest.prototype.witnessList = async function () {
    return await asyncfunc({
        "action": "witness_list"
    })
}

/**
 * 获取指定账户预生成的work。enable_control 需要设置true。
 * @param {string} account - 指定账户
 * @returns {Promise<{code, msg, root, work}>}
 * */
HttpRequest.prototype.getWork = async function (account) {
    if (!account) {
        return { code: 100, msg: 'no param - account' }
    }
    return await asyncfunc({
        "action": "work_get",
        "account": account
    })
}

/**
 * 获取当前节点后台程序版本号，rpc版本号，数据库版本号。
 * @returns {Promise<{code, msg, version, rpc_version, store_version}>}
 * */
HttpRequest.prototype.version = async function () {
    return await asyncfunc({
        "action": "version"
    })
}

/**
 * 停止程序
 * @returns {Promise<{code, msg}>}
 * */
HttpRequest.prototype.stop = async function () {
    let opt = {
        "action": "stop"
    };
    return await asyncfunc(opt);
};

// **************************************************************** 合约相关 开始
/**
 * 获取合约状态
 * @param {string} from - 源账户
 * @param {string} to - 目标账户
 * @param {string} data - 合约代码或数据。
 * @returns {Promise<{code, msg, output}>}
 *      返回成功
 *          {
                "code": 0,
                "msg": "OK",
                "output": "692A70D2E424A56D2C6C27AA97D1A86395877B3A2C6C27AA97D1A86395877B5C"
            }
 //返回失败
 {
                "code": 3,  //1,2,3,4,5
                "msg": "Invalid to account"
            }


 * */
HttpRequest.prototype.call = async function (call_obj) {
    if (!call_obj.from) {
        return { code: 100, msg: 'no param - from' }
    }
    if (!call_obj.to) {
        return { code: 100, msg: 'no param - to' }
    }
    if (!call_obj.data) {
        return { code: 100, msg: 'no param - data' }
    }
    let opt = {
        "action": "call",
        "from": call_obj.from,
        "to": call_obj.to,
        "data": call_obj.data,
        "mci": call_obj.mci ? call_obj.mci : "latest"
    };
    return await asyncfunc(opt);
};

/**
 * 预估交易需消耗的gas数量
 * @param \{
        "from": "czr_4qwoBUYAvxgoVq5FHsXCCCkLCVuJ1z4224ZUVZRGhyawuzbWyh",//（可选）源账户。
        "to": "czr_3gustGDwMtuUTn1iJHBwRYXCBNF51dRixXNeumWDwZLvH43J3d",//（可选）目标账户。
        "amount": "1000000000000000000", //（可选）string, 金额，单位：10-18CZR。
        "password": "s4iH1t@hBFtymA",//（可选）源账户密码。
        "gas": 1000,                    //[必选] 执行交易使用的gas上限。
        "gas_price": "1000000000000",   //[必选] gas价格，单位：10-18CZR/gas，手续费 = 实际使用的gas * gas_price。
        "data": "496E204D617468205765205472757374"//（可选）智能合约代码或数据。默认为空。
    }
 * @param {string} gas - 执行交易使用的gas上限。
 * @param {string} gas_price - gas价格，单位：10-18CZR/gas，手续费 = 实际使用的gas * gas_price。
 * @returns {Promise<{code, msg}>}
 * */
HttpRequest.prototype.estimateGas = async function (req = {}) {
    const opt = { action: 'estimate_gas' }
    req.from && (opt.from = req.from)
    req.to && (opt.to = req.to)
    req.amount && (opt.amount = req.amount)
    req.gas && (opt.gas = req.gas)
    req.gas_price && (opt.gas_price = req.gas_price)
    req.data && (opt.data = req.data)
    req.mci && (opt.mci = req.mci)
    return await asyncfunc(opt)
};

//获取内部交易
HttpRequest.prototype.blockTraces = async function (hash) {
    if (!hash) {
        return { code: 100, msg: 'no param - hash' }
    }
    let opt = {
        "action": "block_traces",
        "hash": hash
    };
    return await asyncfunc(opt);
};

// **************************************************************** 合约相关 结束

module.exports = HttpRequest;
