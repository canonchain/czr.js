let Czr = require("../src/index.js");
let czr = new Czr();
const czrVal = 2;
//toKing
console.log(`${czrVal}CZR toKing 结果  => ${czr.utils.toKing(czrVal, "czr")}`);

//fromKing
console.log(`${czrVal}CZR fromKing 结果  => ${czr.utils.fromKing(czrVal, "czr")}`);

//toBigNumber
const bigVal = czr.utils.toBigNumber(czrVal);
console.log(`${czrVal} toBigNumber 结果  => bigVal`);

//isBigNumber
console.log(`${bigVal} toBigNumber 结果  => ${czr.utils.isBigNumber(bigVal)}`);
console.log(`${czrVal} toBigNumber 结果  => ${czr.utils.isBigNumber(czrVal)}`);