let Czr = require("../src/index.js");
let czr = new Czr();

let mci = 0;
let LIMIT = 50;
let next_index = '';

function getMciBlocks(){
    console.log("开始获取")
    czr.request.mciBlocks(mci,LIMIT, next_index).then(function (res) {
        console.log(`收到数据`);
        console.log(res);
        if(res.next_index){
            next_index = res.next_index;
            //再次循环
            getMciBlocks();
        }else{
            //当前MCIblocks已经取完了
        }
    }).catch(function(error){
        console.log(`收到Error`,error.message)
    });
}
getMciBlocks();
