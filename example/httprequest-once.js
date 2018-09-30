let Czr = require("../src/index.js");
let czr = new Czr();

console.log(`开始发送请求`);
czr.request.accountList().then(function (res) {
    console.log(`收到数据`);
    console.log(res);
    /*
    { accounts:
       [ 'czr_3bmzhn16exf9ftsn3t4a881c7swn834cyudwzi3wxe3teno4eibkk3zmnwpr',
         'czr_1hd95bfoitkgbykr9rrnirfmz4fpew1z3a73u33npfa9jdxen37oopagsjrc',
         'czr_19rw6416uie15u9qfiyt8s8wr5zjac57c1gmb3bdrz1bo4dgm8gm3quwgrfg',
         'czr_1m8qrnixt1a9mjtb6y88stghaghc1gbc4ufcrj1559cb8hpjkwdk851dh86c',
         'czr_1957k75m9y9ec6n38mhbgaawqy19meoi6f5uzpx6eb4auhzh88gc9gtbyr78',
         'czr_1775ww3uwwicwix4fh4sipfd1g37swi8au8imw4p78am19e8fgmm6n7jy7q1' ]
     }
    */
}).catch(function(error){
    console.log(`收到Error`,error.message)
});

