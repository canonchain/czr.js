const crypto = require("crypto");
const argon2 = require("argon2");
const ed25519 = require("ed25519");
const bs58check = require("bs58check");

// var x =
//     {
//         "address": "c76df34d1c067f60942f1e37c2be4fd46edad3fe",
//         "crypto":
//             {
//                 "cipher": "aes-128-ctr",
//                 "ciphertext": "e2c6c73e21201e9916194718324efe7f06da72371e806d47e333bf1e94abfaf1",
//                 "cipherparams": {
//                     "iv": "d34d1a32306937bc198a30b6c918bc1e"
//                 },
//                 "kdf": "scrypt",
//                 "kdfparams":
//                     { "dklen": 32, "n": 262144, "p": 1, "r": 8, "salt": "531f4e16791e71ac95d695a2615955911c47e2295d92609a3952c7cb63f23395" },
//                 "mac": "eefe313515d614e0fb74d0332461b06aa7ae89df2db1551b5c19a5049fa77ce6"
//             },
//         "id": "28808970-c321-4370-baf8-86bc4f68d727", "version": 3
//     }

async function create_account(kdf_salt, iv, prv, password) {
    let kdf_option = {
        type: argon2.argon2d,
        timeCost: 1,
        memoryCost: 16 * 1024,
        parallelism: 1,
        hashLength: 32,
        raw: true,
        salt: kdf_salt,
        version: 0x13
    };

    //password hashing
    let derive_pwd = await argon2.hash(password, kdf_option);

    //加密私钥，加密方法aes-256-ctr
    let cipher = crypto.createCipheriv("aes-256-ctr", derive_pwd, iv);
    let ciphertext = Buffer.concat([cipher.update(prv), cipher.final()]);

    //生成公钥
    let keypair = ed25519.MakeKeypair(prv);
    let pub = keypair.publicKey;

    console.log("kdf_salt: " + kdf_salt.toString('hex').toUpperCase());
    console.log("password: " + password);
    console.log("derive_pwd: " + derive_pwd.toString('hex').toUpperCase());
    console.log("iv: " + iv.toString('hex').toUpperCase());
    console.log("prv: " + prv.toString('hex').toUpperCase());


    // account json file
    // {
    //     "account":"czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca",
    //     "kdf_salt":"AF8460A7D28A396C62D6C51620B87789C862ED8783374EEF7B783145F540EB19",
    //     "iv":"A695DDC35ED9F3183A09FED1E6D92083",
    //     "ciphertext":"1533D0D22D09C65110C6C5C1F6A3580C690FB0C444973FE31DC0916EAF2BCC8C"
    // }

    //clear prv for security, any better methed?
    crypto.randomFillSync(derive_pwd);
    crypto.randomFillSync(prv);

    return {
        pub: pub,
        kdf_salt: kdf_salt,
        iv: iv,
        ciphertext: ciphertext
    }
}

async function change_password(kdf_salt, iv, prv, password) {
    let kdf_option = {
        type: argon2.argon2d,
        timeCost: 1,
        memoryCost: 16 * 1024,
        parallelism: 1,
        hashLength: 32,
        raw: true,
        salt: kdf_salt,
        version: 0x13
    };

    let derive_pwd = await argon2.hash(password, kdf_option);
    let cipher = crypto.createCipheriv("aes-256-ctr", derive_pwd, iv);
    let ciphertext = Buffer.concat([cipher.update(prv), cipher.final()]);

    return ciphertext;
}

async function decrypt_account(kc, password) {
    let kdf_option = {
        type: argon2.argon2d,
        timeCost: 1,
        memoryCost: 16 * 1024,
        parallelism: 1,
        hashLength: 32,
        raw: true,
        salt: kc.kdf_salt,
        version: 0x13
    };

    //password hashing
    let derive_pwd = await argon2.hash(password, kdf_option);

    //从ciphertext解密私钥
    let decipher = crypto.createDecipheriv("aes-256-ctr", derive_pwd, kc.iv);
    let prv = Buffer.concat([decipher.update(kc.ciphertext), decipher.final()]);

    return prv;
}

function encode_account(pub) {
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    let account = "czr_" + bs58check.encode(v_pub);
    return account;
}

function decode_account(account) {
    if (account.length < 54 || account[0] != 'c' || account[1] != 'z' || account[2] != 'r' || account[3] != '_')
        return false;

    let bs58str = account.slice(4);
    let v_pub;
    try { v_pub = bs58check.decode(bs58str); }
    catch (e) { return false; }

    if (v_pub.length != 33)
        return false;

    let version = v_pub.readUInt8(0);
    if (version == 0x01) {
        let pub = v_pub.slice(1);
        return pub;
    }
    else
        return false;
}


async function test_account() {
    console.log("-------------------create_account-------------------------");

    // let kdf_salt = crypto.randomBytes(32);
    // let iv = crypto.randomBytes(16);
    // let prv = crypto.randomBytes(32);
    // let password = "123456";

    let kdf_salt = Buffer.from("AF8460A7D28A396C62D6C51620B87789C862ED8783374EEF7B783145F540EB19", "hex");
    let iv = Buffer.from("A695DDC35ED9F3183A09FED1E6D92083", "hex");
    let prv = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");
    let password = "123456";
    let kc = await create_account(kdf_salt, iv, prv, password);

    console.log();
    console.log("ciphertext: " + kc.ciphertext.toString('hex').toUpperCase());
    console.log("pub: " + kc.pub.toString('hex').toUpperCase());
    let account_c = encode_account(kc.pub);
    console.log("account: " + account_c);
    if (kc.ciphertext.toString('hex').toUpperCase() == "1533D0D22D09C65110C6C5C1F6A3580C690FB0C444973FE31DC0916EAF2BCC8C"
        && kc.pub.toString('hex').toUpperCase() == "34E85B176BE32EFAD87C9EB1EBFC6C54482A6BECBD297F9FDF3BFA8EA342162C"
        && account_c == "czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca") {
        console.log("create_account ok");
    }
    else {
        console.log("create_account fail");
    }


    console.log("-------------------decrypt_account with right password-------------------------");
    let prv1 = await decrypt_account(kc, password);
    let keypair = ed25519.MakeKeypair(prv1);
    let compare = keypair.publicKey;
    console.log("compare: " + compare.toString('hex').toUpperCase());
    if (kc.pub.equals(compare))
        console.log("decrypt_account ok");
    else
        console.log("decrypt_account fail");

    console.log("-------------------decrypt_account with wrong password-------------------------");
    let wrong_password = "aaaa";
    let prv2 = await decrypt_account(kc, wrong_password);
    let keypair2 = ed25519.MakeKeypair(prv2);
    let compare2 = keypair2.publicKey;
    console.log("compare2: " + compare2.toString('hex').toUpperCase());
    if (kc.pub.equals(compare2))
        console.log("decrypt_account ok");
    else
        console.log("decrypt_account fail");


    console.log("-------------------account encoding-------------------------");

    let pub = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");

    console.log("pub:" + pub.toString("hex").toUpperCase());

    let account = encode_account(pub);
    console.log("encode_account:" + account);//czr_3fNUxH2ix1TvrfEMK3s4SVq3YxEhYjzQxDjnYDtEYYKkYVumhu

    let decode_pub = decode_account(account);
    if (decode_pub && decode_pub.equals(pub)) {
        console.log("decode_account:" + decode_pub.toString("hex").toUpperCase());
        console.log("decode_account ok");
    }
    else {
        console.log("decode_account fail");
    }
}


test_account();
