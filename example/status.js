let Czr = require("../src/index.js");
let czr = new Czr();

czr.request.status().then(function (res) {
    console.log(`status`,res);
}).catch(function(error){
    console.log("accountList catch",error)
});

czr.request.mciBlocks("1").then(function (res) {
    console.log(`mciBlocks`,res);
}).catch(function(error){
    console.log("accountList catch",error)
});

czr.request.unstableBlocks().then(function (res) {
    console.log(`unstableBlocks`,res);
}).catch(function(error){
    console.log("accountList catch",error)
});