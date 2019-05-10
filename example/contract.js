let Czr = require("../src/index.js");
let czr = new Czr();

console.log(`开始发送请求`);

// estimateGas
let opt1 = {
    "action": "estimate_gas",
    "from": "czr_4sjcWhaYGjNhQM8RWKwXzYUfKa476Yij8iW556GyYvDu118g3j",
    "to": "czr_3gustGDwMtuUTn1iJHBwRYXCBNF51dRixXNeumWDwZLvH43J3d",
    "amount": "1000000000000000000",
    "password": "12345678",
    "gas": 1000,
    "gas_price": "1000000000000",
    "data": "496E204D617468205765205472757374"
}

let opt2 = {
    "action": "estimate_gas",
    // "from": "czr_4sjcWhaYGjNhQM8RWKwXzYUfKa476Yij8iW556GyYvDu118g3j",
    // "to": "czr_3gustGDwMtuUTn1iJHBwRYXCBNF51dRixXNeumWDwZLvH43J3d",
    // "amount": "1000000000000000000",
    // "password": "12345678",
    "gas": 1000,
    "gas_price": "1000000000000",
    // "data": "496E204D617468205765205472757374"
}

// czr.request.estimateGas(opt1).then(function (res) {
//     console.log(`收到数据`);
//     console.log(res);
// }).catch(function (error) {
//     console.log(`收到Error`, error.message)
// });

// call
let arg1 = {
    "from": "czr_4kYTyZTjRGQoEioCbT8JcKpDaqjJs2ekpxcucTC14SniuNABi6",
    "to": "czr_3KfLt664eysPMc5pp1wTiRQhYELXM7EruDVoEPYWM4bmZRDZJq",
    "data": "0x0dbe671f"
};
czr.request.call(arg1).then(function (res) {
    console.log(`收到数据`);
    console.log(res);
}).catch(function (error) {
    console.log(`收到Error`, error.message)
});
