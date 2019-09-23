/**
 * @author fangke
 * 2019/5/7
 */
const assert = require('assert');
const expect = require('chai').expect;
const bs58check = require("bs58check");

function encode_account(pub) {
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    return "czr_" + bs58check.encode(v_pub);
}

const DEV = true

const Czr = require("../src/index.js");
const czr = new Czr({
    dev: DEV
});

describe('Accounts', function () {

    describe('#create()', function () {

        it('should return account file', function (done) {
            czr.accounts.create('pa55word')
                .then(accountFile => {
                    // console.log(accountFile);
                    expect(accountFile).not.to.be.an('error')
                    expect(accountFile).to.have.property('account')
                    expect(accountFile).to.have.property('kdf_salt')
                    expect(accountFile).to.have.property('iv')
                    expect(accountFile).to.have.property('ciphertext')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        });
    });

    describe('#validate_account()', function () {
        it('should return true', function (done) {
            let file = {
                account: 'czr_3RM17KudgsJztax6iDU285Wnx8GQFJqTGNCP7tGdFr2ywTs9q7',
                kdf_salt: 'F9CAA99D55061E2A4670409F06C7EB95',
                iv: 'AEC5FD84ED69D48C818F4935133441EC',
                ciphertext:
                    'E1864F899C301CCE7170B91B067961D2B4DAE18F233837B6F3DCED1025E8668E'
            };
            czr.accounts.validate_account(file, 'pa55word')
                .then(res => {
                    expect(true).to.equal(res)
                    done()
                })
                .catch(err => {
                    console.log("验证出错啦")
                    done(err)
                })
        });

    });

    describe('#sign()', async function () {
        it('sign msg', async function () {
            const mock = {
                prv: '0000000000000000000000000000000000000000000000000000000000000000',
                pub: '3B6A27BCCEB6A42D62A3A8D02A6F0D73653215771DE243A63AC048A18B59DA29',
                message: '5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053',
                signature: 'AD1E0EEBF552D40608F0D7FF43C2C85B60C2F259D2917FB37B6BC5D468147612BAB9F46FEEE6C2DC5F52C83E564E35457317DC47AFB179574178230BDF68A80E',
            }
            const sig = await czr.accounts.sign(mock.message, mock.prv)
            // console.log(`
            // message : ${mock.message}
            // prv : ${mock.prv}
            // sig ：${sig}
            // `)
            expect(sig).to.equal(mock.signature)
        }
        )

    })

});
