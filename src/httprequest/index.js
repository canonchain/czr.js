"use strict";
// let rpc     = require('node-json-rpc');
let rpc     = require('./rpc-main');
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
    /*client.call(opt,function (err, cal) {
        console.log(err,cal);
        if(err){
            return err;
        }
        return cal

    })*/
}


HttpRequest.prototype.client = client;
/* 

        return 100//没有第一个参数
        return 101 //没有第二个参数

*/


// Account Start

/* 
创建账号： account_create(password)
@parm:
    password
@return:
    {account:""}
*/
HttpRequest.prototype.accountCreate = async function(pwd) {
    if(!pwd){
        return 100
    }
    let opt = {
        "action": "account_create",
        "password":pwd
    };
    return await asyncfunc(opt);
};

/* 
删除账号： account_remove (password)
@parm:
    account
    password
@return:
    {success:"1"}
*/
HttpRequest.prototype.accountRemove = async function(account,pwd) {
    if(!account){
        return 100
    }
    if(!pwd){
        return 101
    }
    let opt = {
        "action": "account_remove",
        "account":account,
        "password":pwd
    };
    return await asyncfunc(opt);
};


/*
导入账号： account_import()
@parm:
    json
@return:
    {success:"1"}   //如果success为0，account为空 account:""
*/
HttpRequest.prototype.accountImport = async function(jsonFile) {
    if(!jsonFile){
        return 100
    }
    let opt = {
        "action": "account_import",
        "json":jsonFile
    };
    return await asyncfunc(opt);
};


/* 
导出账号： account_export()
@parm:
    account
@return:
    {json:""}
*/

HttpRequest.prototype.accountExport = async function(account) {
    if(!account){
        return 100
    }
    let opt = {
        "action": "account_export",
        "account":account
    };
    return await asyncfunc(opt);
};
 
/* 
账号验证： account_validate
@parm:
    account
@return:
    {valid:"1"} 1->正确 0 不正确
*/

HttpRequest.prototype.accountValidate = async function(accountVal) {
    if(!accountVal){
        return 0
    }
    let opt = {
        "action": "account_validate",
        "account": accountVal
    };
    return await asyncfunc(opt);
};

/* 
账号列表： account_list()
@parm:
    
@return:
     {accounts:[]}
*/

HttpRequest.prototype.accountList = async function() {
    let opt = {
        "action": "account_list"
    };
    return await asyncfunc(opt);
};

// Account End



//获取账号余额
HttpRequest.prototype.accountBalance = async function(account) {
    if(!account){
        return 0//没有参数
    }
    let opt = {
        "action": "account_balance",
        "account": account
    };
    return await asyncfunc(opt);
};

//批量获取账户余额
HttpRequest.prototype.accountsBalances = async function(accountAry) {
    if(!accountAry){
        return 0//没有参数
    }
    if(!accountAry){
        return 1 //格式不正确
    }
    let opt = {
        "action": "accounts_balances",
        "accounts": accountAry
    };
    return await asyncfunc(opt);
};

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
HttpRequest.prototype.send = async function(sendObj) {
    if(!sendObj){
        return 0//没有参数
    }
    let opt = {
        "action": "send",
        "from": sendObj.from,
        "to": sendObj.to,
        "amount": sendObj.amount,
        "password": sendObj.password,
        "data": sendObj.data,
        "id": sendObj.id
    };
    return await asyncfunc(opt);
};

HttpRequest.prototype.getBlock = async function(blockHash) {
    if(!blockHash){
        return 0//没有参数
    }
    let opt = {
        "action": "block",
        "hash": blockHash
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
HttpRequest.prototype.blockList = async function(account, limit, index) {
    let opt;
    if(!account){
        return 0//没有参数 
    }
    if(!limit){
        return 1//没有参数 
    }
    if(!index){
        opt = {
            "action": "block_list",
            "account": account,
            "limit": limit
        };
    }else{
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
// {"action":"mci_blocks","mci":"121"} -> {blocks:[]};
HttpRequest.prototype.mciBlocks = async function(mci) {
    let opt = {
        "action": "mci_blocks",
        "mci": mci
    };
    return await asyncfunc(opt);
};

//当前不稳定的所有block的信息
//{"action":"unstable_blocks"}-> {blocks:[]};
HttpRequest.prototype.unstableBlocks = async function() {
    let opt = {
        "action": "unstable_blocks"
    };
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
HttpRequest.prototype.status = async function() {
    let opt = {
        "action": "status"
    };
    return await asyncfunc(opt);
};

//导入账号
/*
{ success: '0', account: '' }
//success 0=未成功，1=成功
* */

HttpRequest.prototype.accountImport = async function(account) {
    if(!account){
        return 100
    }
    let opt = {
        "action": "account_import",
        "json":account
    };
    return await asyncfunc(opt);
};

HttpRequest.prototype.stop = async function() {
    let opt = {
        "action": "stop"
    };
    return await asyncfunc(opt);
};

module.exports = HttpRequest;
