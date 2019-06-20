let Czr = require("../src/index.js");
let czr = new Czr({ dev: true });
// let czr = new Czr();
//TODO 创建账号
// czr.accounts.create(123456).then(res => {
//     console.log("创建账号收到结果\n", res);//res.account
//     const file = {
//         "account": "czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca", "kdf_salt": "AF8460A7D28A396C62D6C51620B87789",
//         "iv": "A695DDC35ED9F3183A09FED1E6D92083", "ciphertext": "96D6B77BC031116919956F1904F25601C29036A9232D638536964E8ADC034360"
//     };


//     console.log("***********************");
//     // console.log(`file:${JSON.stringify(file)}`);
//     console.log(`res.account:${JSON.stringify(res)}`);
//     console.log("***********************");

//     // czr.request.accountImport(JSON.stringify(res)).then(function (res) {
//     //     console.log(`res`,res);
//     // });
// }).catch(err => {
//     console.log("err===>", err);
// });


let keyStore = {
    "account": "czr_3PNjPuXG5bZ2DXdxh1rB82qL65d4nosYFQGJXRKecxJHEBfNB4",
    "kdf_salt": "3188085361BF6CFBA17A76C8F800A77D9B105512217FA18C0D62903637759F9D",
    "iv": "E91AFFAAFA59D1EC9D0190E285A23A76",
    "ciphertext": "389FE5C5843A42AFEE7140E045986E6A284F097FFEB8F760335905138B150FE6"
};
// czr.request.accountImport(JSON.stringify(keyStore)).then((res)=>{
//     console.log("res",res);
// })
// .catch(error=>{
//     console.log("error",error);
// });

//TODO 解密账号私钥 9E91AC7B6E32AEB68A1AA5ECA5CBE24481B412CC129E15A0102D3A6003D2BA0A
// czr.accounts.decrypt(keyStore,2222).then(res=>{
//     console.log("1.解密账号收到结果 ",res);
//     return res
// }).catch(err=>{
//     console.log("decrypt err",err);
// }).then(function (privateKey) {
//     //TODO 签名
//     let blockHash='5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053';
//     czr.accounts.sign(blockHash,privateKey).then(signature=>{
//         //BBFE4DE008DE19C3178EABBAAF032319DDC493AE5E9174065A0E729945BA47CA9CAC6B6F5A509D8123FB1F4A62AD65D4B68E51A863E4BA7033696A89E1FD9C07
//         console.log("2.signature ",signature)
//     }).catch(err=>{
//         console.log("sign err",err);
//     })
// });

//Test 密码是 123456

let testfile0 = {
    account: 'czr_3r9xbZyhgoBEq1W2zXJHAAYdn7xMLx5G3wTG915LvmC9KGDcxt',
    kdf_salt: 'CA3198A0E1C2CB2373ECD3B2A72731CA',
    iv: 'ED38751A235B8E901724EE7791712148',
    ciphertext:
        '103A707074045BB79CFCF7D6696794C333A04F66EB3FFC99F97F2A6132BFBBF7'
}

//Test

//下面的 秘钥是 FC3C7A50062AC7088A1A008006A1EAD27DDFA3DF0C3206B906C9E00F0282DD38
let testfile = {
    "account": "czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca",
    "kdf_salt": "AF8460A7D28A396C62D6C51620B87789C862ED8783374EEF7B783145F540EB19",
    "iv": "A695DDC35ED9F3183A09FED1E6D92083",
    "ciphertext": "B5F9D332D310B62F497E9490E5591288A0B6904BA2B7F3E63AAC71E5EDFFA7FC"
};

czr.accounts.decrypt(testfile0, 1232456).then(res => {
    console.log("1.解密账号收到结果============= ", res);
    console.log("结果是否相同", res === "5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053");
    return res
}).catch(err => {
    console.log("decrypt err", err);
}).then(function (privateKey) {
    //TODO 签名
    // let blockHash='5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053';
    // czr.accounts.sign(blockHash,privateKey).then(signature=>{
    //     //BBFE4DE008DE19C3178EABBAAF032319DDC493AE5E9174065A0E729945BA47CA9CAC6B6F5A509D8123FB1F4A62AD65D4B68E51A863E4BA7033696A89E1FD9C07
    //     console.log("2.signature ",signature)
    // }).catch(err=>{
    //     console.log("sign err",err);
    // })
});

// console.log('decodeAccount', czr.accounts.decodeAccount(testfile.account))

// const account_keystore = {
//     "account": "czr_3pwnMsKt57bvK4R7eP4ZnYCCrZ2rSd9ATYnozLyq7y8n2bGaG4",
//     "ciphertext": "0C91F5769FAD5A2A3901739A2ECAA35C51182AA8A4EFABEF5D04B719822FF8BC",
//     "iv": "21E8B0F3227DAAB5C0B1D59C41361745",
//     "kdf_salt": "3C56C2ED0E388A41005E5937DDCEB857"
// }

// czr.accounts.decrypt(account_keystore, '1234qwer')
//     .then(privateKey => {
//         console.log('privateKey', privateKey)
//         let blockHash='5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053';
//         czr.accounts.sign(blockHash, privateKey)
//             .then(signature => {
//                 console.log('signature', signature)
//             })
//             .catch(console.error)
//     })
//     .catch(console.error)
