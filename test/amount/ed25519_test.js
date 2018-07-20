const ed25519 = require("ed25519");


async function test_ed25519() {
    let prv = Buffer.from("0000000000000000000000000000000000000000000000000000000000000000", "hex");

    //calculate public key
    let start = process.hrtime();

    let keypair = await ed25519.MakeKeypair(prv);

    let dur = process.hrtime(start);

    console.log("MakeKeypair duration: " + dur[1] + "ns");

    console.log("prv: " + prv.toString('hex').toUpperCase());
    console.log("keypair.privateKey: " + keypair.privateKey.toString('hex').toUpperCase());
    console.log("keypair.publicKey: " + keypair.publicKey.toString('hex').toUpperCase());

    //sign
    let message = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");

    let start2 = process.hrtime();

    let signature = await ed25519.Sign(message, prv);

    let dur2 = process.hrtime(start2);

    console.log("Sign duration: " + dur2[1]+ "ns");

    console.log("message: " + message.toString('hex').toUpperCase());
    console.log("signature: " + signature.toString('hex').toUpperCase());

    //verify
    let start3 = process.hrtime();

    let valid = await ed25519.Verify(message, signature, keypair.publicKey);

    let dur3 = process.hrtime(start3);

    console.log("Verify duration: " + dur3[1] + "ns");

    if(valid)
    {
        console.log("Verify ok");
    }
    else
    {
        console.log("Verify fail");
    }
}

test_ed25519();
