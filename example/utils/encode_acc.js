const utils = require('../../src/utils/index');

function encode_account(pub) {
    pub = Buffer.from(pub, "hex");
    console.log(pub);
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    return "czr_" + bs58check.encode(v_pub);
}

//czr_4hq247YBUtNX6JvceUFhWhHMMsLtM7ZP2Knw9SarW8hFNVY2mz
//czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u
//B5F327E3F07F2C94DADCDB6D122ADDAFD3AA3AC9507E8F8368F9AD3E6A378798 => czr_4KsqkcZCs6i9VU2WUsiqTU8M6i3WYpVPFMcMXSkKmB92GJvYt1
let acc = utils.encode_account("B5F327E3F07F2C94DADCDB6D122ADDAFD3AA3AC9507E8F8368F9AD3E6A378798")

console.log(acc);