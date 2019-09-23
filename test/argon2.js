const argon2 = require("argon2-wasm-pro");
const crypto = require("crypto");
const edPro = require("ed25519-wasm-pro");
// const ed25519 = require("ed25519");
const bs58check = require("bs58check");

// let kdf_salt    = crypto.randomBytes(16);
// let iv          = crypto.randomBytes(16);
// let privateKey  = crypto.randomBytes(32);
// let password = '12345678';

async function createAccount(opts, iv, privateKey) {
    opts.pass = opts.pass || '123456';
    opts.salt = opts.salt || Buffer.from("AF8460A7D28A396C62D6C51620B87789", "hex");;
    opts.type = opts.type || argon2.ArgonType.Argon2id;
    opts.time = opts.time || 1;
    opts.mem = opts.mem || 256;//256   16 * 1024  测试环境是256
    opts.parallelism = opts.parallelism || 1;
    opts.hashLen = opts.hashLen || 32;

    let derive_pwd = await argon2.hash(opts)
    let derive_pwd_val = derive_pwd.hashHex.toUpperCase();
    //加密私钥，加密方法aes-256-ctr
    let cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(derive_pwd.hash.buffer), iv);
    let ciphertext = Buffer.concat([cipher.update(privateKey), cipher.final()]);

    //生成公钥

    let promise = new Promise(function (resolve, reject) {
        try {
            edPro.ready(function () {
                // let keypair = ed25519.MakeKeypair(privateKey);
                // let pub = keypair.publicKey;

                const keys = edPro.createKeyPair(privateKey)
                // console.log("new ed", Buffer.from(keys.publicKey.buffer))
                let pub = Buffer.from(keys.publicKey.buffer);
                const kc = {
                    pub: pub,
                    kdf_salt: opts.salt,
                    iv: iv,
                    ciphertext: ciphertext
                }
                let ciphertextVal = kc.ciphertext.toString('hex').toUpperCase();

                let pubVal = kc.pub.toString('hex').toUpperCase();

                let account_c = encode_account(kc.pub);
                resolve(
                    {
                        "derive_pwd": derive_pwd_val,
                        "account": account_c,
                        "ciphertext": ciphertextVal,
                        "pub": pubVal
                    }
                )
            })
        } catch (e) {
            reject(e)
        }
    });
    return promise;
}


function encode_account(pub) {
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    let account = "czr_" + bs58check.encode(v_pub);
    return account;
}

/* 

kdf_salt:AF8460A7D28A396C62D6C51620B87789
password:123456
iv:A695DDC35ED9F3183A09FED1E6D92083
prv:5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053

derive_pwd:B37318E4BF5F578E824D773963C2D0FE6FA5F8A94D7DDA6D98728DBE5B5E4D17

ciphertext:96D6B77BC031116919956F1904F25601C29036A9232D638536964E8ADC034360
pub:34E85B176BE32EFAD87C9EB1EBFC6C54482A6BECBD297F9FDF3BFA8EA342162C
account:czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca
create_account: ok
*/
module.exports = createAccount;