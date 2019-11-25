# Abi

## toBigNumber

将事件名编码为其 ABI 签名，该签名是事件名称与参数的 sha3 哈希。

```
czr.abi.encodeEventSignature(eventName);
```

### 参数

| 字段      | 类型   | 描述   |
| --------- | ------ | ------ |
| eventName | String | Object | 事件名称编码。或事件的 JSON 接口对象。<br/>如果是字符串，则必须采用形式 `event(type,type,...)`，例如：`myEvent(uint256,uint32[],bytes10,bytes)` |

### 返回结果

String - 事件的 ABI 签名。

### 例子

```
let sign1 = czr.abi.encodeEventSignature('myEvent(uint256,bytes32)');

let opt2 = {
    name: 'myEvent',
    type: 'event',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    }, {
        type: 'bytes32',
        name: 'myBytes'
    }]
};
let sign2 = czr.abi.encodeEventSignature(opt2);
```
