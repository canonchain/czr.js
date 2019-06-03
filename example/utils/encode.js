let Czr = require("../../src/index.js");
let czr = new Czr();

let hex = '00000000000000000000000000000000000000000000000000000000000003E8';
console.log(`${hex}CZR toWei 结果  => ${czr.utils.encode(hex)}`);