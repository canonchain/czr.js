(async () => {
    let Czr = require("../src/index.js");
    let czr = new Czr();
    // call
    let arg1 = {
        "from": "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u",
        "to": "czr_4hq247YBUtNX6JvceUFhWhHMMsLtM7ZP2Knw9SarW8hFNVY2mz",
        "data": "06fdde03"
    };
    let res = await czr.request.call(arg1);
    console.log(`收到数据`);
    console.log(res);
    console.log(czr.utils.decode.name(res.output));
})()