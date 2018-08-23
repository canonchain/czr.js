let Czr = require("../src/index.js");

//创建账号
// Czr.accounts.create(2222).then(res => {
//     console.log("创建账号收到结果\n", res);
// }).catch(err => {
//     console.log(err);
// });

//解密账号 9e91ac7b6e32aeb68a1aa5eca5cbe24481b412cc129e15a0102d3a6003d2ba0a
let keyStore = {
    account: "czr_3vWdWYrTYVhhrJKoRaYESnUgdJCTLPPB9ZyWrgMDiVh1VbaiBM",
    kdf_salt: "10EEBA15619E42B95419CDA115DE5DC85141B0E8474DACCADB7DE81874A96C60",
    iv: "E1EDE18DEBF5DEFEEE94F42FCF81EAF6",
    ciphertext: "E39941F5638206C3E7BFB5340635C2717AEF1DC1349F61D218ABA65E1C2FECC9"
};
Czr.accounts.decrypt(keyStore,2222).then(res=>{
    console.log("解密账号收到结果\n",res);
}).catch(err=>{
    console.log(err);
});