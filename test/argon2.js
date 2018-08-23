const argon2        = require("argon2");
const crypto        = require("crypto");

let kdf_salt    = crypto.randomBytes(32);
let iv          = crypto.randomBytes(16);
let privateKey  = crypto.randomBytes(32);
let password = '12345678';
console.log(`kdf_salt:`,kdf_salt);
console.log(`iv:`,iv);
console.log(`privateKey:`,privateKey);
//password hashing
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

argon2.hash(password, kdf_option).then(hash => {
    console.log("成功",hash.toString('hex'))
}).catch(err => {
    console.log("失败")
});