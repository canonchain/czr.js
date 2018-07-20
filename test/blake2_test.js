const blake = require("blakejs");


async function test_blake2() {
    let input = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");

    let start = process.hrtime();

    let result = await blake.blake2b(input, null, 32);

    let dur = process.hrtime(start);

    console.log("duration: " + dur[1] / 1000000 + "ms");

    console.log("input: " + input.toString('hex').toUpperCase());
    console.log("hash: " + Buffer.from(result.buffer).toString('hex').toUpperCase());
}

test_blake2();
