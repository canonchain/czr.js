"use strict";
const crypto = require("crypto");
// const argon2 = require("argon2");
const argon2 = require("argon2-wasm-pro");

const edPro = require("ed25519-wasm-pro");

const bs58check = require("bs58check");

function encode_account(pub) {
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    return "czr_" + bs58check.encode(v_pub);
}

async function createAccount(password, COSTNUM) {
    let kdf_salt = crypto.randomBytes(16);
    let iv = crypto.randomBytes(16);
    let privateKey = crypto.randomBytes(32);


    //测试的
    // let kdf_salt    = Buffer.from("AF8460A7D28A396C62D6C51620B87789", "hex");
    // let iv          = Buffer.from("A695DDC35ED9F3183A09FED1E6D92083", "hex");
    // let privateKey  = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");

    // console.log("私钥",privateKey.toString('hex'));

    //password hashing
    let kdf_option = {
        pass: password.toString(),
        salt: kdf_salt,
        type: argon2.ArgonType.Argon2id,
        time: 1,
        mem: COSTNUM,
        parallelism: 1,
        hashLen: 32,

        // raw: true,
        // version: 0x13
    };

    try {
        let derivePwd = await argon2.hash(kdf_option);
        //加密私钥
        let cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(derivePwd.hash.buffer), iv);//加密方法aes-256-ctr
        let ciphertext = Buffer.concat([cipher.update(privateKey), cipher.final()]);
        let promise = new Promise(function (resolve, reject) {
            try {
                // 生成公钥
                edPro.ready(function () {
                    const keypair = edPro.createKeyPair(privateKey)
                    let publicKey = Buffer.from(keypair.publicKey.buffer);

                    //clear privateKey for security, any better methed?
                    crypto.randomFillSync(Buffer.from(derivePwd.hash.buffer));
                    crypto.randomFillSync(privateKey);

                    let accFile = {
                        account: encode_account(publicKey),
                        kdf_salt: kdf_salt.toString('hex').toUpperCase(),
                        iv: iv.toString('hex').toUpperCase(),
                        ciphertext: ciphertext.toString('hex').toUpperCase()
                    }
                    resolve(accFile)
                })
            } catch (e) {
                reject(e)
            }
        });
        return promise;
    } catch (err) {
        throw err;
    }

}

async function decryptAccount(keystore, password, COSTNUM) {
    keystore.kdf_salt = Buffer.from(keystore.kdf_salt, "hex");
    keystore.iv = Buffer.from(keystore.iv, "hex");
    keystore.ciphertext = Buffer.from(keystore.ciphertext, "hex");

    let kdf_option = {
        pass: password.toString(),
        salt: keystore.kdf_salt,
        type: argon2.ArgonType.Argon2id,
        time: 1,
        mem: COSTNUM,
        parallelism: 1,
        hashLen: 32,

        // raw: true,
        // version: 0x13
    };

    //password hashing
    try {
        let derivePwd = await argon2.hash(kdf_option);
        //从ciphertext解密私钥
        let decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(derivePwd.hash.buffer), keystore.iv);
        let privateKey = Buffer.concat([decipher.update(keystore.ciphertext), decipher.final()]);
        return privateKey.toString('hex').toUpperCase();
    } catch (err) {
        throw err;
    }

}

function signBlock(block, privateKey) {
    let promise = new Promise(function (resolve, reject) {
        try {
            edPro.ready(function () {
                block = Buffer.from(block, "hex");
                privateKey = Buffer.from(privateKey, "hex");
                const keys = edPro.createKeyPair(privateKey)
                let signature = edPro.sign(block, keys.publicKey, keys.secretKey)
                let result = Buffer.from(signature.buffer).toString('hex').toUpperCase();
                resolve(result);
            })
        } catch (e) {
            reject(e)
        }
    });
    return promise;
}

async function validateAccount(keystore, password, COSTNUM) {
    let prv1 = await decryptAccount(keystore, password, COSTNUM);
    let promise = new Promise(function (resolve, reject) {
        try {
            edPro.ready(function () {
                const keypair = edPro.createKeyPair(Buffer.from(prv1, "hex"))
                let compare = Buffer.from(keypair.publicKey.buffer);
                if (encode_account(compare) === keystore.account) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        } catch (e) {
            reject(e)
        }
    });
    return promise;
}

async function decryptAndSign(keystore, password, block) {

}


/* 封装Accounts类 */
let Accounts = function (dev) {
    if (dev) {
        //如果是测试环境
        this.COSTNUM = 256;
    } else {
        this.COSTNUM = 16 * 1024;
    }

};

/*
* 创建账户
* parame: pwd
* return: account object
*
{
    "account":"czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca",
    "kdf_salt":"xxx",
    "iv":"xxxx",
    "ciphertext":"xxxx"
}
*/

/**
 * create account
 * @param password - account password
 * @return Promise{accountFile | Error} - accountFile { account, kdf_salt, iv, ciphertext }
 * */
Accounts.prototype.create = function (password) {
    return createAccount(password, this.COSTNUM);
};

/*
* 验证keystore文件
* parame: keystore pwd
* return: boolena
* */
Accounts.prototype.validate_account = function (key, password) {
    return validateAccount(key, password, this.COSTNUM);
};

/*
* 解密账户私钥
* parame: keystore pwd
* return: privateKey
*
* */
Accounts.prototype.decrypt = async function (keystore, password) {
    let isValidate = await validateAccount(keystore, password, this.COSTNUM);
    if (isValidate) {
        return decryptAccount(keystore, password, this.COSTNUM)
    } else {
        let exception = new Error("Parameter (password)'s value invalid");
        throw exception;
    }
};

/*
* 签名
* parame: block,privateKey
* return: signature
* */
Accounts.prototype.sign = async function (block, privateKey) {
    return await signBlock(block, privateKey);

};

/*
* 解密和签名
* */
Accounts.prototype.decryptAndSign = function (keystore, password, block) {
    return decryptAccount(keystore, password, this.COSTNUM)
};

// /**
//  * 解码账户
//  * @return publicKey - 账户的公钥
//  * */
// Accounts.prototype.decodeAccount = function (account) {
//     return bs58check.decode(account.substring(4)).slice(1).toString('hex')
// };


/*
* create(pwd)
* decrypt(kc,pwd)
* sign(blockHash, prv)
*
*
* */
// module.exports = new Accounts();
module.exports = Accounts;


