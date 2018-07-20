const crypto = require("crypto");


async function test_aes() {
    let key = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");
    let iv = Buffer.from("A695DDC35ED9F3183A09FED1E6D92083", "hex");
    let plaintext = Buffer.from("AF8460A7D28A396C62D6C51620B87789C862ED8783374EEF7B783145F540EB19", "hex");

    //encrypt
    let start = process.hrtime();

    let cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
    let ciphertext = cipher.update(plaintext.toString('hex'), "hex", "hex");
    ciphertext += cipher.final("hex");

    let dur = process.hrtime(start);

    console.log("encrypt duration: " + dur[1] + "ns");

    console.log("key: " + key.toString('hex').toUpperCase());
    console.log("iv: " + iv.toString('hex').toUpperCase());
    console.log("plaintext: " + plaintext.toString('hex').toUpperCase());
    console.log("ciphertext: " + ciphertext.toUpperCase());


    //decrypt
    let start2 = process.hrtime();

    let decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
    let deciphertext = decipher.update(ciphertext, "hex", "hex");
    deciphertext += decipher.final("hex");

    let dur2 = process.hrtime(start2);

    console.log("decrypt duration: " + dur2[1] + "ns");

    console.log("deciphertext: " + deciphertext.toUpperCase());

    if(plaintext.toString('hex') == deciphertext)
    {
        console.log("decrypt ok");
    }
    else
    {
        console.log("decrypt fail");
    }
}

test_aes();
