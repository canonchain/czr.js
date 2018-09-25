let Czr = require("../src/index.js");
let czr = new Czr();

const  now = new Date();
console.log(now.getFullYear(),(now.getMonth()+1),now.getDate()," : ",now.getHours(),now.getMinutes(),now.getSeconds());

// const opt ={ action: 'accounts_balances',
//     accounts:
//         [ 'czr_1hd95bfoitkgbykr9rrnirfmz4fpew1z3a73u33npfa9jdxen37oopagsjrc',
//             'czr_19rw6416uie15u9qfiyt8s8wr5zjac57c1gmb3bdrz1bo4dgm8gm3quwgrfg',
//             'czr_1957k75m9y9ec6n38mhbgaawqy19meoi6f5uzpx6eb4auhzh88gc9gtbyr78' ] };
// czr.request.accountsBalances(opt).then(function (res) {
//     console.log(res);
// }).catch(function(error){
//     console.log("accountValidate catch",error)
// });

let timer =null;
let falg = 0;
const pageUtility={
    runTimer:function () {
        falg++;
        console.log(`重启定时器,${falg}`);
        timer=setTimeout(function () {
            pageUtility.getList()
        },10)
    },
    getList:function () {
        console.log(`开始发送请求`);
        czr.request.accountList().then(function (res) {
            console.log(`收到数据`);
            pageUtility.runTimer();
        }).catch(function(error){
            console.log("accountList catch",error)
        });
    }
};
pageUtility.runTimer();
