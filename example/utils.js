let Czr = require("../src/index.js");
let czr = new Czr();
const czrVal = 2;
//toCan
console.log(`${czrVal}CZR toCan 结果  => ${czr.utils.toCan(czrVal, "czr")}`);
console.log(`${czrVal}CZR toCanToken 结果  => ${czr.utils.toCanToken(czrVal, 1000000000000000000)}`);

//fromCan
console.log(`${czrVal}CZR fromCan 结果  => ${czr.utils.fromCan(czrVal)}`);
console.log(`${czrVal}CZR fromCanToken 结果  => ${czr.utils.fromCanToken(czrVal, 1000000000000000000)}`);

//toBigNumber
const bigVal = czr.utils.toBigNumber(czrVal);
console.log(`${czrVal} toBigNumber 结果  => bigVal`, bigVal);

//isBigNumber
console.log(`${bigVal} toBigNumber 结果  => ${czr.utils.isBigNumber(bigVal)}`);
console.log(`${czrVal} toBigNumber 结果  => ${czr.utils.isBigNumber(czrVal)}`);

//ACCOUNT
console.log(' ******************* Account Start ******************* ')
console.log(czr.utils.encodeAccount('B5F327E3F07F2C94DADCDB6D122ADDAFD3AA3AC9507E8F8368F9AD3E6A378798'))
console.log(czr.utils.encodeAccount('22'))
console.log(czr.utils.decodeAccount('czr_4KsqkcZCs6i9VU2WUsiqTU8M6i3WYpVPFMcMXSkKmB92GJvYt1'))
try {
    console.log(czr.utils.decodeAccount('22'))
} catch (error) {
    console.log(error)
}
console.log(' ******************* Account End ******************* ')