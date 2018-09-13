let Czr = require("../src/index.js");
let czr = new Czr();
const czrVal = 2;
//toWei
console.log(`${czrVal}CZR toWei 结果  => ${czr.utils.toWei(czrVal, "czr")}`);

//formWei
console.log(`${czrVal}CZR formWei 结果  => ${czr.utils.fromWei(czrVal, "czr")}`);

//toBigNumber
const bigVal = czr.utils.toBigNumber(czrVal);
console.log(`${czrVal} toBigNumber 结果  => bigVal`);

//isBigNumber
console.log(`${bigVal} toBigNumber 结果  => ${czr.utils.isBigNumber(bigVal)}`);
console.log(`${czrVal} toBigNumber 结果  => ${czr.utils.isBigNumber(czrVal)}`);