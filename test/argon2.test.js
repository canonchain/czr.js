// add.test.js
var createAccount = require('./argon2.js');
var expect = require('chai').expect;

let kdf_salt = Buffer.from("AF8460A7D28A396C62D6C51620B87789", "hex");
let password = "123456";
let iv = Buffer.from("A695DDC35ED9F3183A09FED1E6D92083", "hex");
let privateKey = Buffer.from("5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053", "hex");

let kdf_option = {
    pass: password,
    salt: kdf_salt
};


describe('CZR:账号测试', function () {
    describe('#derive_pwd()', function () {
        it('derive_pwd', async () => {
            let result = await createAccount(kdf_option, iv, privateKey);
            expect(result.derive_pwd).to.equal("B37318E4BF5F578E824D773963C2D0FE6FA5F8A94D7DDA6D98728DBE5B5E4D17");
        });
    })
    describe('#account()', function () {
        it('account', async () => {
            let result = await createAccount(kdf_option, iv, privateKey);
            expect(result.account).to.equal("czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca");
        });
    })
    describe('#ciphertext()', function () {
        it('ciphertext', async () => {
            let result = await createAccount(kdf_option, iv, privateKey);
            expect(result.ciphertext).to.equal("96D6B77BC031116919956F1904F25601C29036A9232D638536964E8ADC034360");
        });
    })
    describe('#pub()', function () {
        it('pub', async () => {
            let result = await createAccount(kdf_option, iv, privateKey);
            expect(result.pub).to.equal("34E85B176BE32EFAD87C9EB1EBFC6C54482A6BECBD297F9FDF3BFA8EA342162C");
        });
    })

    // End
});

