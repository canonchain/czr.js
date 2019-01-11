const argon2        = require("argon2");
const crypto        = require("crypto");
const ed25519       = require("../module/ed25519/index");
const bs58check     = require("bs58check");

// let kdf_salt    = crypto.randomBytes(16);
// let iv          = crypto.randomBytes(16);
// let privateKey  = crypto.randomBytes(32);
// let password = '12345678';

let kdf_salt    = Buffer.from("AF8460A7D28A396C62D6C51620B87789", "hex");
let password    = "123456";
let iv          = Buffer.from("A695DDC35ED9F3183A09FED1E6D92083", "hex");
let privateKey  = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");

console.log(`kdf_salt:`,kdf_salt);
console.log(`iv:`,iv);
console.log(`privateKey:`,privateKey);
//password hashing
let kdf_option = {
    type: argon2.argon2id,
    timeCost: 1,
    memoryCost: 256,//256   16 * 1024  测试环境是256
    parallelism: 1,
    hashLength: 32,
    raw: true,
    salt: kdf_salt,
    version: 0x13
};

argon2.hash(password, kdf_option).then(derive_pwd => {
    console.log("derive_pwd",derive_pwd.toString('hex'))
    //加密私钥，加密方法aes-256-ctr
    let cipher = crypto.createCipheriv("aes-256-ctr", derive_pwd, iv);
    let ciphertext = Buffer.concat([cipher.update(privateKey), cipher.final()]);

    //生成公钥
    let keypair = ed25519.MakeKeypair(privateKey);
    let pub = keypair.publicKey;

    const kc = {
        pub: pub,
        kdf_salt: kdf_salt,
        iv: iv,
        ciphertext: ciphertext
    }
    console.log();
    console.log("ciphertext: " + kc.ciphertext.toString('hex').toUpperCase());
    console.log("pub: " + kc.pub.toString('hex').toUpperCase());
    let account_c = encode_account(kc.pub);
    console.log("account: " + account_c);

}).catch(err => {
    console.log("失败")
    console.log(err)
});

function encode_account(pub) {
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    let account = "czr_" + bs58check.encode(v_pub);
    return account;
}