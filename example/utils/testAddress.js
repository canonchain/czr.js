const bs58check = require("bs58check");

function encode_account() {
    let pub=Buffer.from('B5F327E3F07F2C94DADCDB6D122ADDAFD3AA3AC9507E8F8368F9AD3E6A378798', "hex");
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    let account = "czr_" + bs58check.encode(v_pub);
    console.log(account)
    account="czr_4KsqkcZCs6i9VU2WUsiqTU8M6i3WYpVPFMcMXSkKmB92GJvYt1"
    let res=account.split("_")
    console.log(res)
    let bytecode=bs58check.decode(res[1])
    console.log(bytecode)
    console.log(bytecode.toString())
    // console.log(bytecode.toString("hex").substring(2).toUpperCase());
}

encode_account()