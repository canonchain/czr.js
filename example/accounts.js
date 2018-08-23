let Czr=require("../src/index.js");

//创建账号
/*Czr.accounts.create(2222).then(res=>{
    console.log("收到结果\n",res);
}).catch(err=>{
    console.log(err);
});*/

//解密账号
Czr.accounts.decrypt(1,2).then(res=>{
    console.log("收到结果\n",res);
}).catch(err=>{
    console.log(err);
});
