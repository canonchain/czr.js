let Czr = require("../../src/index.js");
let czr = new Czr();

let sign1 = czr.abi.encodeEventSignature('myEvent(uint256,bytes32)');

let opt2 = {
    name: 'myEvent',
    type: 'event',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    }, {
        type: 'bytes32',
        name: 'myBytes'
    }]
};

let opt3 = {
    name: 'myEvent',
    type: 'event',
    inputs: [{
        type: 'uint256'
    }, {
        type: 'bytes32'
    }]
};

let sign2 = czr.abi.encodeEventSignature(opt2);
let sign3 = czr.abi.encodeEventSignature(opt3);


console.log(sign1)
console.log(sign2)
console.log(sign3)