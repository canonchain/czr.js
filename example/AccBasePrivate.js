(async()=>{
  let Czr = require("../src/index.js");
  let czr = new Czr({ dev: true });
  let private = '5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053'
  let res =  await czr.accounts.createByPrivate(123456,private);
  console.log("res",res);

  // generatePublicByPrivate
  let res2 =  await czr.accounts.getAccountByPrivate(private);
  console.log("res2",res2);

})()