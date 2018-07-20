const crypto = require("crypto");
const argon2 = require("argon2");

async function test_argon2()
{
    //let _salt = await crypto.randomBytes(32);
    let _salt = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053","hex");
   
    let option = {
        type: argon2.argon2d,
        timeCost:1,
        memoryCost:  16 * 1024, 
        parallelism:1,
        hashLength: 32,
        raw : true,
        salt: _salt,
        version: 0x13
    };

    const _hash = await argon2.hash("password", option);

    return { hash : _hash, salt : _salt };
}

let start = process.hrtime();

test_argon2().then(function(result){

    let dur = process.hrtime(start);

    console.log("duration: " + dur[1] / 1000000 + "ms");
    console.log("salt: " + result.salt.toString("hex").toUpperCase());
    console.log("hash: " + result.hash.toString('hex').toUpperCase());
    
});




