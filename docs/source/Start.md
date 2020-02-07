# 使用演示

`czr.js` 是一个与canonchain节点交互使用的库。

## 安装

首先，您需要将 `czr.js` 放入您的项目中。

可以使用以下方法完成此操作：

```
npm install czr
```

之后，您需要启动本地Canonchain节点，实例化`czr`。

Canonchain下载：http://dev.canonchain.com/download.html

Canonchain命令行：https://canonchain.readthedocs.io/zh/latest/source/Command-Line-Interfaces.html

默认使用的端口 `127.0.0.1:8765`

## 使用方法

```js
let Czr = require("czr");
let czr = new Czr();// 默认使用 127.0.0.1:8765

// 如果要修改端口，请下面这种设置
// 例子
// const options = {
//     host: "127.0.0.1",
//     port: 8888
// };
// let czr = new Czr(options);

//现在您可以使用该czr对象了
//例子
czr.request.status().then(function (res) {
    console.log(`status`,res);
}).catch(function(error){
    console.log("accountList catch",error)
});
```