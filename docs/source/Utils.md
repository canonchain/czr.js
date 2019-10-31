# Utils

## toBigNumber

将数值转成`bignumber`

```
czr.utils.toBigNumber(value)
```

### 参数

| 字段  | 类型            | 描述         |
| ----- | --------------- | ------------ |
| value | String / Number | 需要转换的值 |

### 返回结果

一个 Bignumber 类型的值

```
BigNumber { s: 1, e: 0, c: [ 2 ] }
```

### 例子

```
const bigVal = czr.utils.toBigNumber(2);
```

## isBigNumber

判断值是否为 `bignumber` 类型值

```
czr.utils.isBigNumber(value)
```

### 参数

| 字段  | 类型                           | 描述         |
| ----- | ------------------------------ | ------------ |
| value | String / Number /Bignumber ... | 需要判断的值 |

### 返回结果

如果是 Bignumber 类型的值，返回`true`,否则为`false`

### 例子

```
const isBig = czr.utils.isBigNumber(2);
```

## encode

对值进行编码

```
czr.utils.encode.parse(parm);
```

### 参数

| 字段 | 类型   | 描述           |
| ---- | ------ | -------------- |
| parm | Object | 需要编码的对象 |

### 返回结果

编码后的值

### 例子

```
let parm = {
    functionName: "constructor",
    args: ["1000000000000000000000000000", "canonChain", "CZR"]
};
let data = czr.utils.encode.parse(parm);

console.log("********************* data **********************");
console.log(data);

// 结果如下
//{ functionName: 'constructor',
  args: [ '1000000000000000000000000000', 'canonChain', 'CZR' ],
  funABI:
   { inputs: [ [Object], [Object], [Object] ],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'constructor' },
  data:
   '60806040...' }
```

## decode

解码

```
utils.decode.parse(bytecode, abi);
```

### 参数

| 字段     | 类型         | 描述             |
| -------- | ------------ | ---------------- |
| bytecode | 十六进制数据 | 需要解码的值     |
| abi      | JSON         | 按照什么格式解码 |

### 返回结果

解码后的值

### 例子

```
let abi = {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
}

let name_response = "0x" + "0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000A63616E6F6E436861696E00000000000000000000000000000000000000000000";

let nameInfo2 = czr.utils.decode.parse(name_response, abi);
//[ { name: '', type: 'string', value: 'canonChain' } ]
```

## encodeAccount

把十六进制账户，转为 `czr_xxx` 格式的账户

```
czr.utils.encodeAccount(value);
```

### 参数

| 字段  | 类型         | 描述         |
| ----- | ------------ | ------------ |
| value | 十六进制数据 | 需要转换的值 |

### 返回结果

`czr_xxx` 格式的账户

### 例子

```
let czrAcc = czr.utils.encodeAccount("B5F327E3F07F2C94DADCDB6D122ADDAFD3AA3AC9507E8F8368F9AD3E6A378798")
console.log(czrAcc);//czr_4KsqkcZCs6i9VU2WUsiqTU8M6i3WYpVPFMcMXSkKmB92GJvYt1
```

## fromCan

从`can`单位转为 `czr` 单位

```
czr.utils.fromCan(czrVal)
```

### 参数

| 字段   | 类型   | 描述         |
| ------ | ------ | ------------ |
| czrVal | Number | 需要转换的值 |

### 返回结果

`czr`为单位的值

### 例子

```
let val = czr.utils.fromCan(2);//0.000000000000000002
```

## fromCanToken

通过指定 `Token精度` 把值转为 `Token余额`

```
czr.utils.fromCan(value,precision)
```

### 参数

| 字段      | 类型          | 描述                        |
| --------- | ------------- | --------------------------- |
| value     | Number/String | 需要转换的值                |
| precision | Number/String | 一个 Token 对应多少最小单位 |

### 返回结果

指定精度为单位的值

### 例子

```
let val = czr.utils.fromCanToken(2,1000000000000000000);//0.000000000000000002
```

## toCan

`czr`单位转成`can`单位

```
czr.utils.toCan(value)
```

### 参数

| 字段  | 类型   | 描述         |
| ----- | ------ | ------------ |
| value | Number | 需要转换的值 |

### 返回结果

`can`为单位的值

### 例子

```
let val = czr.utils.toCan(2);//2000000000000000000
```
