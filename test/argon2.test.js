// add.test.js
var createAccount = require('./argon2.js');
var expect = require('chai').expect;

describe('CZR:账号测试', function () {
    it('derive_pwd', function () {
        createAccount().then(resu => {
            expect(resu.derive_pwd).to.be.an("B37318E4BF5F578E824D773963C2D0FE6FA5F8A94D7DDA6D98728DBE5B5E4D17");
            done()
        }).catch(() => { })
    });
    it('account', function () {
        createAccount().then(resu => {
            expect(result.account).to.be.an("czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca");
            done()
        }).catch(() => { })
    });
    it('ciphertext', function () {
        createAccount().then(resu => {
            expect(result.ciphertext).to.be.an("96D6B77BC031116919956F1904F25601C29036A9232D638536964E8ADC034360");
            done()
        }).catch(() => { })
    });
    it('derive_pwd', function () {
        createAccount().then(resu => {
            expect(result.pub).to.be.an("34E85B176BE32EFAD87C9EB1EBFC6C54482A6BECBD297F9FDF3BFA8EA342162C");
            done()
        }).catch(() => { })
    });
});