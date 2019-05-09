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

    describe('#sign()', function () {

        // it('sign tx hash with password', function (done) {
        //     const pwd = 'pa55word'
        //     const txHash = '5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053'
        //     czr.accounts.create(pwd)
        //         .then(accountFile => {
        //             // console.log('accountFile', accountFile)
        //             czr.accounts.decrypt(accountFile, pwd)
        //                 .then(seed => {
        //                     // console.log('seed', seed)
        //                     const signature = czr.accounts.sign(txHash, seed)
        //                     // console.log('signature', signature) // 0CC139B02B39F764E882568F8CB87133389BA4BD0F2C586E3F3C53DB1B80449E544F479B1317C054647C56DAAF495E21CF5A22AD3AD20F3F231CC22B7BFD700D
        //                     done()
        //                 })
        //                 .catch(done)
        //         })
        //         .catch(done)
        // })

        // it('sendOfflineBlock', function (done) {
        //     let pwd = 'pa55word'
        //     let account1 = {
        //         account: 'czr_3W2PxU2qwJMoFymReA7xwTK9YtzETU1nmwsPB9rc4ANT1qxu5n',
        //         kdf_salt: '7B17F11043B8FCA665DD4471CE92CB93',
        //         iv: '7721059FB9486DB4E9D856837C34DF23',
        //         ciphertext: '1B4712B2D972D18EDF0E334D61DFD4058FD0DCFB17C7288F35B51B919DFD052E'
        //     }
        //     let account2 = {
        //         account: "czr_4FTzKm2pfHtu1NGymT3dqKKGMrs9QqdXvdmRJjGJ4bzEht3ePj",
        //         kdf_salt: "EB515EBF70B1CDB31E4C696EBDCA9B8D",
        //         iv: "8A12EE96E5AC19F15C8361898ECC215A",
        //         ciphertext: "2A406AE222FAAC77D0EDC86C8AC2D1E14B975E03E9E2A9E247F974260C839641"
        //     }
        //     let tx = {
        //         amount: "0",
        //         data: "",
        //         from: "czr_3W2PxU2qwJMoFymReA7xwTK9YtzETU1nmwsPB9rc4ANT1qxu5n",
        //         gas: 0,
        //         gas_price: "1000",
        //         id: Math.random(),
        //         password: "pa55word",
        //         to: "czr_4FTzKm2pfHtu1NGymT3dqKKGMrs9QqdXvdmRJjGJ4bzEht3ePj",
        //     }
        //     let offlineBlock = {
        //         "code": 0,
        //         "msg": "OK",
        //         "hash": "E06726B31507FC44F4E63F903B96A5A559F1C607C6543E7176500D5F37A6C866",
        //         "from": "czr_3W2PxU2qwJMoFymReA7xwTK9YtzETU1nmwsPB9rc4ANT1qxu5n",
        //         "to": "czr_4FTzKm2pfHtu1NGymT3dqKKGMrs9QqdXvdmRJjGJ4bzEht3ePj",
        //         "amount": "0",
        //         "previous": "0000000000000000000000000000000000000000000000000000000000000000",
        //         "gas": 0,
        //         "gas_price": "1000",
        //         "data": "",
        //         "exec_timestamp": 1557372445,
        //         "work": "0000000000000000"
        //     }
        //     let signature;
        //     // console.log('tx',JSON.stringify(tx))
        //     // done()
        //     czr.accounts.decrypt(account1, pwd)
        //         .then(seed => {
        //             console.log('seed', seed)
        //             const signature = czr.accounts.sign(offlineBlock.hash, seed)
        //             console.log('signature', signature)
        //             offlineBlock.signature = signature
        //             console.log('offlineBlock', JSON.stringify(offlineBlock))
        //             done()
        //         })
        //         .catch(done)
        // })

        it('sign msg', async function () {
                const mock = {
                    prv: '0000000000000000000000000000000000000000000000000000000000000000',
                    pub: '3B6A27BCCEB6A42D62A3A8D02A6F0D73653215771DE243A63AC048A18B59DA29',
                    message: '5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053',
                    signature: 'AD1E0EEBF552D40608F0D7FF43C2C85B60C2F259D2917FB37B6BC5D468147612BAB9F46FEEE6C2DC5F52C83E564E35457317DC47AFB179574178230BDF68A80E',
                }
                const sig = czr.accounts.sign(mock.message, mock.prv)
                expect(sig).to.equal(mock.signature)
            }
        )

    })

});
