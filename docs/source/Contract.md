# 合约

## 使用

`Contract`对象可以让开发者更容易的与`Canonchain`节点进行智能合约交互；

> 开发者**必须提供相应的智能合约 json 接口**

json 接口格式如下：

```json
[
	{
		"constant": true,
		"inputs": [],
		"name": "xxx",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	...
]
```



### 约定

- **参数中**：`[]` 整括号内参数属于可选参数，其它为必选
- 文档中出现的`myContract`变量，均为合约实例；

---



## new contract

创建一个合约实例（包含 json 接口中定义的所有方法）

```js
let myContract = new czr.Contract(jsonInterface[, account][, options])
```

### 参数

- `jsonInterface` \<Object> ：json 接口
- `account` \<String> ：需要调用的合约地址
  - 后续也可以通过 `myContract.options.account = 'czr_account'` 进行设置
- `options` \<Object>：作为 call 和 sendBlock 的后备参数
  - `from` \<String> ：默认发送地址
  - `gas_price` \<String> ：默认 Gas price 单位:1\*10<sup>-18</sup> CZR
  - `gas` \<String> | \<Number> ：为交易提供的最大 Gas
  - `data` \<String> ：合约字节码

### 返回值

`Object`：合约实例及所有方法

### 示例

```js
let myContract = new czr.Contract(
    [...],
    'czr_contract_address',
    {
        from: 'czr_account',
        gas_price: '20000000000',
        gas:'2000000',
        data:''
    }
);
```



---

## myContract 属性

- options

  - options.account
  - options.jsonInterface

- methods

## options

```js
myContract.options;
```

### 属性

属性为 `Object` 选项

- account \<String> 部署合约的地址；
- jsonInterface \<Array>：json 接口(含有 sign 属性值)
- data \<String>：字节代码,合约部署时使用
- from \<String>：默认发送地址（没有则为`null`）
- gas_price \<String>：用于交易的 Gas price
- gas \<String> | \<Number>：为交易提供的最大 Gas（Gas 限制）

### 示例

```js
//get
myContract.options;
> {
    account: 'contract_account',
    jsonInterface: [...],
    from: 'czr_account',
    gas_price: '10000000000000',
    gas: 1000000
}

//set
myContract.options.account = 'contract_account';
myContract.options.from = 'czr_account';
myContract.options.gas_price = '2000000000';
myContract.options.gas = 5000000;
```



---

## options.account

需要交互的合约地址，实例所有交易都将以此地址为 `'to'` 的值；

### 属性

`myContract.options.account` \<String> | \<Null>：此合约的地址，如果尚未设置地址则为`null`。

### 示例

```js
//get
myContract.options.account;
> 'czr_contract_address'

// set
myContract.options.account = 'czr_contract_address';
```



---

## options.jsonInterface

合约 json 接口

### 属性

`myContract.options.jsonInterface` \<Array>：此合约的 json 接口

**重新设置它将重新生成合同实例的方法**；

### 示例

```js
myContract.options.jsonInterface;
> [
    {
        "type":"function",
        "name":"foo",
        "inputs": [{"name":"a","type":"uint256"}],
        "outputs": [{"name":"b","type":"address"}]
    }
]

// set
myContract.options.jsonInterface = [...];
```



---

## myContract.methods 属性

`myContract.methods` 返回该合约所有可调用的方法；

每个方法会创建一个事务对象，可以`call` `sendBlock` `encodeABI`



---

## myContract 方法

- clone
- deploy
- methods
  - methods.myMethod.call
  - methods.myMethod.sendBlock
  - methods.myMethod.encodeABI

---

## clone

克隆一个当前相同的合约实例

克隆后的实例与源实例无任何关系，对克隆后的实例更改，不会影响源实例；

```js
myContract.clone(); //无参数
```

### 返回值

新的合约实例

### 示例

```js
let contract1 = new czr.Contract(abi, account, {gas_price: '12345678', from: fromAddress});

let contract2 = contract1.clone();
contract2.options.account = account2;

(contract1.options.account !== contract2.options.account);
> true
```



---

## deploy

调用此函数，合约将部署到区块链；

```js
myContract.deploy({
  data: '',
  arguments: []
});
```

### 参数

- `options` \<Object>：用于部署的选项。
  - `data` \<String>：合同的字节代码。
  - `arguments` \<Array>（可选）：在部署时传递给构造函数的参数。

### 返回值

Object：事务对象：

- `arguments` \<Array> ：之前传递给方法的参数。他们可以改变。
- `sendBlock` \<Function> ：部署合约到链上。
- `encodeABI` \<Function> ：对部署的 ABI 进行编码，即合约数据+构造函数参数。

### 示例

**sendBlock**

```js
//sendBlock promise
myContract
  .deploy({
    data: bytecode
  })
  .sendBlock({
    from: 'czr_account',
    gas: 3000000,
    gas_price: '1000000000'
  })
  .then(data => {
    console.log('data', data);
  })
  .catch(function(error) {
    console.log('error', error);
  });

//sendBlock callback
myContract
  .deploy({
    data: bytecode
  })
  .sendBlock(
    {
      from: 'czr_account',
      gas: 3000000,
      gas_price: '1000000000'
    },
    function(error, transactionHash) {
      console.log('error ==> ', error);
      console.log('transactionHash ==> ', transactionHash);
    }
  );

```

**encodeABI**

```js
// encodeABI
myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
    .encodeABI();

> '0x12345...0000012345678765432'

```



---

## methods

```js
myContract.methods.myMethod([param1[, param2[, ...]]])
```

`myMethod`是一个方法名，具体取决于 JSON 接口，合约方法有下面几种调用方式

- 名称：`myContract.methods.myMethod(123)`
- 带参数的名称：`myContract.methods['myMethod(uint256)'](123)`
- 签名：`myContract.methods['0x58cf5f10'](123)`

允许调用相同名称但不同参数的函数

### 参数

任何方法的参数都取决于`json接口`中的参数要求

### 返回

Object：事务对象：

- `arguments` \<Array> ：之前传递给方法的参数。他们可以改变。
- `call` \<Function> ：调用"常量"方法而不是发送交易(不改变智能合约状态)！
- `sendBlock` \<Function> ：降事务发送到链上(改变智能合约状态)！
- `encodeABI` \<Function> ：为此方法编码 ABI



---

## methods.myMethod.call

`myContract.methods.myMethod([param1[, param2[, ...]]]).call(options[, callback])`

### 参数

- options \<Object>：用于 call 的选项。
  - from \<String>：from 账号。
- callback \<Function>：将使用智能合约方法执行的结果作为第二个参数或使用错误对象作为第一个参数来触发此回调。

### 返回

`Promise`对象；

```js
//promise
myContract.methods.testCall1().call()
    .then(data => {
        console.log('testCall1 data', data)
    })
    .catch(function (error) {
        console.log('error', error)
    });


//callback
myContract.methods.testCall1().call(function(error, result){
    ...
})
```



---

## methods.myMethod.sendBlock

事务会发送到智能合约并执行其方法；（会改变合约状态）

### 参数

- `options \<Object>：用于 call 的选项。
  - `from` \<String>：from 账号。
  - `gas_price` \<String>：用于此交易的 wei 的Gas价格。
  - `gas` \<String>| \<Number>：为此交易提供的最大 Gas（Gas 限制）。
  - `value`  `Number | String | BN | BigNumber`事务传输的值。
- `callback` \<Function>：将使用智能合约方法执行的结果作为第二个参数或使用错误对象作为第一个参数来触发此回调；
  - 返回交易哈希值

### 返回

\<Promise> 返回交易收据。

### 示例

```js

// promise
myContract.methods.myMethod(123).sendBlock({from: 'czr_account'})
    .then(function(receipt){
        // 交易收据
    });

// callback
myContract.methods.myMethod(123).sendBlock({from: 'czr_account'}, function(error, transactionHash){
    ...
});

```



---

## methods.myMethod.encodeABI

```js
myContract.methods.myMethod([param1[, param2[, ...]]]).encodeABI()
```

无参数

### 返回

\<String>：通过事务或调用发送的编码 ABI 字节代码。

### 示例

```js
let encodeABIData = myContract.methods.myMethod(123).encodeABI();
console.log(encodeABIData);
//'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```



---
