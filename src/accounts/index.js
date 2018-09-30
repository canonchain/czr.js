"use strict";
const crypto = require("crypto");
const argon2 = require("argon2");
const ed25519 = require("ed25519");
const bs58check = require("bs58check");

const TEST = true;
let   COSTNUM;
if (TEST) {
    COSTNUM = 8;
} else {
    COSTNUM = 16 * 1024;
}

function encode_account(pub) {
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    return "czr_" + bs58check.encode(v_pub);
}

async function createAccount(password) {
    let kdf_salt    = crypto.randomBytes(32);
    let iv          = crypto.randomBytes(16);
    let privateKey  = crypto.randomBytes(32);

    /*let kdf_salt    = Buffer.from("AF8460A7D28A396C62D6C51620B87789C862ED8783374EEF7B783145F540EB19", "hex");
    let iv          = Buffer.from("A695DDC35ED9F3183A09FED1E6D92083", "hex");
    let privateKey  = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");*/

    // console.log("私钥",privateKey.toString('hex'));//9e91ac7b6e32aeb68a1aa5eca5cbe24481b412cc129e15a0102d3a6003d2ba0a

    //password hashing
    let kdf_option = {
        type: argon2.argon2d,
        timeCost: 1,
        memoryCost: COSTNUM,
        parallelism: 1,
        hashLength: 32,
        raw: true,
        salt: kdf_salt,
        version: 0x13
    };

    try {
        let derivePwd = await argon2.hash(password.toString(), kdf_option);
        //加密私钥
        let cipher = crypto.createCipheriv("aes-256-ctr", derivePwd, iv);//加密方法aes-256-ctr
        let ciphertext = Buffer.concat([cipher.update(privateKey), cipher.final()]);

        //生成公钥
        let keypair = ed25519.MakeKeypair(privateKey);
        let publicKey = keypair.publicKey;

        //clear privateKey for security, any better methed?
        crypto.randomFillSync(derivePwd);
        crypto.randomFillSync(privateKey);

        return {
            account: encode_account(publicKey),
            kdf_salt: kdf_salt.toString('hex').toUpperCase(),
            iv: iv.toString('hex').toUpperCase(),
            ciphertext: ciphertext.toString('hex').toUpperCase()
        }

    } catch (err) {
        return err;
    }

}

async function decryptAccount(keystore, password) {
    keystore.kdf_salt = Buffer.from(keystore.kdf_salt, "hex");
    keystore.iv = Buffer.from(keystore.iv, "hex");
    keystore.ciphertext = Buffer.from(keystore.ciphertext, "hex");

    let kdf_option = {
        type: argon2.argon2d,
        timeCost: 1,
        memoryCost: COSTNUM,
        parallelism: 1,
        hashLength: 32,
        raw: true,
        salt: keystore.kdf_salt,
        version: 0x13
    };

    //password hashing
    try {
        let derive_pwd = await argon2.hash(password.toString(), kdf_option);
        //从ciphertext解密私钥
        let decipher = crypto.createDecipheriv("aes-256-ctr", derive_pwd, keystore.iv);
        let privateKey = Buffer.concat([decipher.update(keystore.ciphertext), decipher.final()]);
        return privateKey.toString('hex').toUpperCase();
    } catch (err) {
        return err;
    }

}

async function signBlock(block, privateKey) {
    block = Buffer.from(block, "hex");
    privateKey = Buffer.from(privateKey, "hex");

    let signature = ed25519.Sign(block, privateKey);
    // console.log("block: " + block.toString('hex').toUpperCase());
    // console.log("signature: " + signature.toString('hex').toUpperCase());
    return signature.toString('hex').toUpperCase();
}

async function decryptAndSign(keystore, password, block) {

}


/* 封装Accounts类 */
let Accounts = function (password) {
};

/*
* 创建账户
* parame: pwd
* return: account object
*
{
    "account":"czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca",
    "kdf_salt":"AF8460A7D28A396C62D6C51620B87789C862ED8783374EEF7B783145F540EB19",
    "iv":"A695DDC35ED9F3183A09FED1E6D92083",
    "ciphertext":"1533D0D22D09C65110C6C5C1F6A3580C690FB0C444973FE31DC0916EAF2BCC8C"
}
*/
Accounts.prototype.create = function (password) {
    return createAccount(password)
};

/*
* 解密账户私钥
* parame: keystore pwd
* return: privateKey
*
* */
Accounts.prototype.decrypt = function (keystore, password) {
    return decryptAccount(keystore, password)
};

/*
* 签名
* parame: block,privateKey
* return: signature
* */
Accounts.prototype.sign = function (block, privateKey) {
    return signBlock(block, privateKey)
};

/*
* 解密和签名
* */
Accounts.prototype.decryptAndSign = function (keystore, password, block) {
    return decryptAccount(keystore, password)
};


/*
* create(pwd)
* decrypt(kc,pwd)
* sign(blockHash, prv)
*
*
* */
module.exports = new Accounts();


