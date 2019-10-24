// solc
const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');//您使用的时候需要自己手动安装
const srcpath = path.resolve(__dirname, 'sources', 'test.sol');
const source = fs.readFileSync(srcpath, 'utf-8');
let input = {
    "language": 'Solidity',
    "sources": {
        'test1.sol': {
            "content": source
        }
    },
    "settings": {
        "optimizer": {
            "enabled": true,
            "runs": 200
        },
        "outputSelection": {
            '*': {
                '': ['legacyAST'],
                '*': ['abi', 'metadata', 'devdoc', 'userdoc', 'evm.legacyAssembly', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'evm.gasEstimates']
            }
        }
    }
}
let output = JSON.parse(solc.compile(JSON.stringify(input)));

let bytecode = output.contracts['test1.sol']['Web3Test'].evm.bytecode.object
let interfaceFile = output.contracts['test1.sol']['Web3Test']['abi']

// console.log("contractByteCode :", contractByteCode)
// console.log("methodIdentifiers :", methodIdentifiers)
// console.log("abi :", abi)
//End

// let Contract = require('../../src/contract/index');
let Czr = require("../../src/index.js");
let czr = new Czr();

let czrUrl = 'http://127.0.0.1:8765/';
let curAccount = '';
let myContract = {}
let config = {
    czr: function () {
        curAccount = 'czr_3DG8FjYSAqkBNubcSVAAjAtSQ9Q2tWVNwPS8VHQ55XwWG4DsTS';//czr_3D75PTzmnfe6eopvWR5291qkMs3i1xFL8niQKowPd9bv1DEVAW
        czr.Contract.setProvider(czrUrl);
        myContract = new czr.Contract(interfaceFile, curAccount, {
            from: 'czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u',
            gas: 2000000,
            gas_price: '1000000000'
        });
    }
}
config.czr();

console.log("demo start")

let utility = {
    init() {
        // utility.prop();
        // utility.clone();

        //第零步
        // utility.allMethods();

        //第一步
        utility.testSend1();

        //第二步
        // utility.testCall1();

        //第三部
        // utility.testSend2();

        //第四部
        // utility.testCall2()

        //send
        // utility.onlyDeploy();
        // utility.deploy1();
        // utility.testEvent();
        // utility.EventTest();
    },
    prop() {
        console.log('------属性-----')
        console.log(`myContract.options`, myContract.options);
        console.log(`初始地址: ${myContract.options.account}`);
        console.log(`JSON接口:`, myContract.options.jsonInterface.length);//计算hash


        //注释
        // myContract.options.account = '0xc608d3853748c8E178A0803Bc6061C466B2F3c57'
        // console.log(`改变地址: ${myContract.options.account}`);
        // utility.clone();
    },

    //abi
    allMethods() {
        console.log("----- allMethods -----");
        console.log(myContract.methods);
        console.log("----- allMethods -----");

        console.log('\n\n\n')
        console.log('------encodeABI-----')
        console.log(`testCall1: ${myContract.methods.testCall1().encodeABI()}`);
        let encodeABIData = myContract.methods.testSend2(200, 201).encodeABI();
        console.log(`testSend2: ${encodeABIData}`);
        console.log('------encodeABI-----')
    },

    //call
    testCall1() {
        console.log('------testCall1-----')
        myContract.methods.testCall1().call(function (error, result) {
            console.log("Call1 start------ ");
            console.log(error)
            console.log(result)
            console.log("Call1 end------ ");
        }).then(data => {
            console.log('Call1 data', data)
            console.log('------testCall1-----')
        }).catch(function (error) {
            console.log('Call1 catch error', error)
        });
    },
    testCall2() {
        console.log('------testCall2-----')
        myContract.methods.testCall2(0, 1).call(function (error, result) {
            console.log("Call2 start------ ");
            console.log(error)
            console.log(result)
            console.log("Call2 start------ ");
        }).then(data => {
            console.log('Call2 data', data);
            console.log('------testCall2-----');
        }).catch(function (error) {
            console.log('Call2 catch error', error)
        });
    },
    //************************************* */
    onlyDeploy() {
        try {
            let cccc = myContract.deploy({ data: bytecode })
            console.log("cccc")
            console.log(cccc)
        } catch (error) {
            console.log("catch error")
            console.log(error)
        }
    },
    deploy1() {
        myContract.deploy({
            data: bytecode
        })
            .sendBlock({
                password: '12345678',
                amount: "0"
            }, function (error, transactionHash) {
                console.log("deploy回调")
                console.log("error ==> ", error)
                console.log("transactionHash ==> ", transactionHash)
            })
            .then(function (res) {
                console.log(res)
            })
            .catch(function (error) {
                console.log('catch', error)
            });
    },
    testSend1() {
        console.log("----- testSend1 -----")
        myContract.methods.testSend1()
            .sendBlock({
                amount: "0",
                password: '12345678',
            }, function (error, transactionHash) {
                console.log("回调")
                console.log("error ==> ", error)
                console.log("transactionHash ==> ", transactionHash)
            })
            .then(function (newContractInstance) {
                console.log('新合约实例')
                console.log(newContractInstance) // instance with the new contract account
                console.log("----- testSend1 -----")
            }).catch(error => {
                console.log("catch")
                console.log(error)
            })

    },
    testSend2() {
        console.log("----- testSend2 -----")
        myContract.methods.testSend2(110, 119)
            .sendBlock(
                {
                    amount: "0",
                    password: '12345678',
                },
                function (error, transactionHash) {
                    console.log("回调")
                    console.log("error ==> ", error)
                    console.log("transactionHash ==> ", transactionHash)
                }
            )
            .then(data => {
                console.log('testSend2 data', data)
                console.log("----- testSend2 -----")
            }).catch(function (error) {
                console.log('testSend2 error', error)
            });
    },
    testEvent() {
        console.log("----- testEvent -----")
        myContract.methods.testEvent()
            .sendBlock(
                {
                    amount: "0",
                    password: '12345678',
                }
            )
            .then(data => {
                console.log('testEvent data', data)
                console.log("----- testEvent -----")
            }).catch(function (error) {
                console.log('testEvent error', error)
            });
    },
    clone() {
        console.log("\n 准备使用clone方法------------------------------ ");
        let myContract2 = myContract.clone();
        myContract2.options.account = '0xXXXXXXXXXXXXXXXXXXXXXX'
        console.log(`初始地址：${myContract.options.account}`);
        console.log(`克隆地址：${myContract2.options.account}`);
    },

    //Event
    EventTest() {
        console.log("----- EventTest -----")
        myContract.getPastEvents('EventTest', {
            from_stable_block_index: 0
        })
            .then(function (events) {
                console.log("收到啦")
                console.log(events) // same results as the optional callback above
                console.log("----- EventTest -----")
            });

    }
};
utility.init();