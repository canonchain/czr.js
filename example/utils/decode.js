const utils = require('../../src/utils/index');
let abi = {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
}

let name_response = "0x" + "0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000A63616E6F6E436861696E00000000000000000000000000000000000000000000";

let nameInfo = utils.decode.name(name_response);
let nameInfo2 = utils.decode.parse(name_response, abi);
console.log(nameInfo)
console.log(nameInfo2)
