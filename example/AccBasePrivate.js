(async()=>{
  let Czr = require("../src/index.js");
  let czr = new Czr({ dev: true });
  let res =  await czr.accounts.createByPrivate(123456,'5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053');
  console.log("res",res);
})()