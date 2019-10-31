let Czr = require("../src/index.js");
let czr = new Czr();
const czrVal = 2;
//toCan
console.log(`${czrVal}CZR toCan 结果  => ${czr.utils.toCan(czrVal, "czr")}`);

//fromCan
console.log(`${czrVal}CZR fromCan 结果  => ${czr.utils.fromCan(czrVal)}`);
console.log(`${czrVal}CZR fromCanToken 结果  => ${czr.utils.fromCanToken(czrVal, 1000000000000000000)}`);

//toBigNumber
const bigVal = czr.utils.toBigNumber(czrVal);
console.log(`${czrVal} toBigNumber 结果  => bigVal`, bigVal);

//isBigNumber
console.log(`${bigVal} toBigNumber 结果  => ${czr.utils.isBigNumber(bigVal)}`);
console.log(`${czrVal} toBigNumber 结果  => ${czr.utils.isBigNumber(czrVal)}`);