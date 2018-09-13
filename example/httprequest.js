let Czr = require("../src/index.js");
let czr = new Czr();
czr.request.accountList().then(function (res) {
    console.log(res);
});
