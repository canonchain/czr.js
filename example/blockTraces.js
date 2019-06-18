let Czr = require("../src/index.js");
let czr = new Czr();
let hash = "72AB49BF2AA3AA35956659E450F2013BB5D864E6FE025FC9DC365F47500A4046";
console.log(`开始发送请求`);
czr.request.blockTraces(hash).then(function (res) {
    console.log(`收到数据`);
    console.log(res);
}).catch(function (error) {
    console.log(`收到Error`, error.message)
});
