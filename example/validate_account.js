let Czr = require("../src/index.js");
//let czr = new Czr({dev:true});
let czr = new Czr();

let kys ={"account":"czr_4SB2CTeS2FkgDgSMcgVVmJYo8DRXEJ5xtcSKw6gX1XoJ8w67yr","ciphertext":"81EEF422810CCEB9980A8992F46788589508714BB9A5D6EEA8F9213E9F271425","iv":"F99796558C54A4D142BAD72E5D3858AF","kdf_salt":"283C5E6F51D1E0BE186B1139C64275C3"};
//TODO 验证账号
czr.accounts.validate_account(kys,'12345678').then(res => {
    console.log("收到结果\n", res);
}).catch(err => {
    console.log("err===>",err);
});


// let keyStore = {
//     "account":"czr_3PNjPuXG5bZ2DXdxh1rB82qL65d4nosYFQGJXRKecxJHEBfNB4",
//     "kdf_salt":"3188085361BF6CFBA17A76C8F800A77D9B105512217FA18C0D62903637759F9D",
//     "iv":"E91AFFAAFA59D1EC9D0190E285A23A76",
//     "ciphertext":"389FE5C5843A42AFEE7140E045986E6A284F097FFEB8F760335905138B150FE6"
// };
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

//Test

// let testfile ={
//     "account":"czr_3M3dbuG3hWoeykQroyhJssdS15Bzocyh7wryG75qUWDxoyzBca","kdf_salt":"AF8460A7D28A396C62D6C51620B87789C862ED8783374EEF7B783145F540EB19","iv":"A695DDC35ED9F3183A09FED1E6D92083","ciphertext":"B5F9D332D310B62F497E9490E5591288A0B6904BA2B7F3E63AAC71E5EDFFA7FC"};
//
// czr.accounts.decrypt(testfile,123456).then(res=>{
//     console.log("1.解密账号收到结果============= ",res);
//     console.log("结果是否相同",res ==="5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053");
//     return res
// }).catch(err=>{
//     console.log("decrypt err",err);
// }).then(function (privateKey) {
//     //TODO 签名
//     // let blockHash='5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053';
//     // czr.accounts.sign(blockHash,privateKey).then(signature=>{
//     //     //BBFE4DE008DE19C3178EABBAAF032319DDC493AE5E9174065A0E729945BA47CA9CAC6B6F5A509D8123FB1F4A62AD65D4B68E51A863E4BA7033696A89E1FD9C07
//     //     console.log("2.signature ",signature)
//     // }).catch(err=>{
//     //     console.log("sign err",err);
//     // })
// });