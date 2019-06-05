let AbiCoder = require('./abi-coder/index');
let bs58check = require("bs58check");
// console.log("Start")

// **************** tuple
function extractSize(type) {
    let size = type.match(/([a-zA-Z0-9])(\[.*\])/)
    return size ? size[2] : ''
};

function makeFullTupleTypeDefinition(typeDef) {
    if (typeDef && typeDef.type.indexOf('tuple') === 0 && typeDef.components) {
        let innerTypes = typeDef.components.map((innerType) => innerType.type)
        return `tuple(${innerTypes.join(',')})${extractSize(typeDef.type)}`
    }
    return typeDef.type
};
// **************** tuple

function parseToArray(hex_data, fnabi) {
    // console.log(hex_data)
    // console.log(fnabi)
    // 如果有outputs
    if (fnabi.outputs && fnabi.outputs.length > 0) {
        try {
            let i;

            //ABI的输出类型
            let outputTypes = [];
            for (i = 0; i < fnabi.outputs.length; i++) {
                let type = fnabi.outputs[i].type;//string
                outputTypes.push(type.indexOf('tuple') === 0 ? makeFullTupleTypeDefinition(fnabi.outputs[i]) : type);//helper
            }

            if (!hex_data.length) {
                hex_data = new Uint8Array(32 * fnabi.outputs.length); // 确保数据至少由0填充，因为如果没有数据，则 “ AbiCoder ” 会抛错
            }
            // decode data
            let abiCoder = new AbiCoder();//
            let decodedObj = abiCoder.decode(outputTypes, hex_data);//[ 'canonChain' ]

            let output_ary = [];
            for (i = 0; i < outputTypes.length; i++) {
                let name = fnabi.outputs[i].name;//{ name: '', type: 'string' }
                // console.log(outputTypes[i], decodedObj[i])
                if (outputTypes[i] === "address") {
                    let pub = Buffer.from(decodedObj[i].substr(2), "hex");
                    let version = Buffer.from([0x01]);
                    let v_pub = Buffer.concat([version, pub]);
                    let account = "czr_" + bs58check.encode(v_pub);
                    // output_ary[i] = outputTypes[i] + ': ' + (name ? name + ' ' + account : account);
                    output_ary.push(
                        {
                            name: name || "",
                            type: outputTypes[i],
                            value: account
                        }
                    )
                } else {
                    output_ary.push(
                        {
                            name: name || "",
                            type: outputTypes[i],
                            value: decodedObj[i]
                        }
                    )
                    // output_ary[i] = outputTypes[i] + ': ' + (name ? name + ' ' + decodedObj[i] : decodedObj[i]);
                }

            }
            /**
             * 返回数据由原来的
             * {'0': 'string: canonChain'}
             * 改为
             * [ { name: '', type: 'string', value: 'canonChain' } ]
             */
            return output_ary;
        } catch (e) {
            console.log("err")
            return { error: 'Failed to decode output: ' + e };
        }
    }
    return [];
}

// ABI开始
let owner_abi = {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
};
let name_abi = {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
};
let symbol_abi = {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
};
let decimals_abi = {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
};
let balance_of_abi = {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
};
let total_supply_abi = {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
};
let allowance_abi = {
    constant: true,
    inputs: [{ name: "", type: "address" }, { name: "", type: "address" }],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
};

// fn
let pageUtility = {
    parse: (data, abi) => {
        data = (data.indexOf("0x") === -1) ? "0x" + data : data;
        return parseToArray(data, abi);
    },
    // 所有者
    owner: (data) => {
        return pageUtility.parse(data, owner_abi);
    },
    // 名字
    name: (data) => {
        return pageUtility.parse(data, name_abi);
    },
    // 符号
    symbol: (data) => {
        return pageUtility.parse(data, symbol_abi);
    },
    //精度
    decimals: (data) => {
        return pageUtility.parse(data, decimals_abi);
    },
    // 总额
    totalSupply: (data) => {
        return pageUtility.parse(data, total_supply_abi);
    },
    // 查账户A 对应的token数量
    balanceOf: (data) => {
        return pageUtility.parse(data, balance_of_abi);
    },
    // 查看授权转账
    allowance: (data) => {
        return pageUtility.parse(data, allowance_abi);
    }
}

module.exports = {
    parse: pageUtility.parse,
    name: pageUtility.name,         //名字
    symbol: pageUtility.symbol,     //标记
    owner: pageUtility.owner,       //所属
    decimals: pageUtility.decimals,     //精度
    totalSupply: pageUtility.totalSupply,//总供应
    balanceOf: pageUtility.balanceOf,
    allowance: pageUtility.allowance
}