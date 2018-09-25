let Czr = require("../src/index.js");
let czr = new Czr();

//Stop
czr.request.stop().then(function (res) {
    console.log(`收到数据`);
    console.log(res);
}).catch(function(error){
    console.log(error.message)
});