# 账户

## create

创建账户

```
czr.accounts.create(password)
    .then(res => {})
    .catch()
```

### 参数

| 字段     | 类型   | 描述       |
| -------- | ------ | ---------- |
| password | String | 账户的密码 |

### 返回结果

一个新账户的 keystore 文件

### 例子

```
czr.accounts.create(123456).then(res => {
    console.log("创建账号收到结果\n", res);//res.account
    console.log(`res.account:${JSON.stringify(res)}`);
}).catch(err => {
    console.log("err===>", err);
});
```

## validateAccount

验证 `keystore`文件 和 密码 是否可以正常解析

```
czr.accounts.validateAccount(keystore,password)
    .then(res => {})
    .catch()
```

### 参数

| 字段     | 类型     | 描述       |
| -------- | -------- | ---------- |
| keystore | Keystore | 账户文件   |
| password | String   | 账户的密码 |

### 返回结果

如果密码可以解开 `keystore`文件 返回 `true`，否则返回 `false`

### 例子

```
czr.accounts.validateAccount(keystore,123456).then(res => {
    console.log("结果\n", res);
}).catch(err => {
    console.log("err===>", err);
});
```

## decrypt

通过 `keystore`文件 和 密码 来解账户私钥

```
czr.accounts.decrypt(keystore,password)
    .then(res => {})
    .catch()
```

### 参数

| 字段     | 类型     | 描述       |
| -------- | -------- | ---------- |
| keystore | Keystore | 账户文件   |
| password | String   | 账户的密码 |

### 返回结果

如果密码可以解开 `keystore`文件 返回私钥文件，否则会报错；

### 例子

```
czr.accounts.decrypt(keystore,123456).then(res => {
    console.log("结果\n", res);
}).catch(err => {
    console.log("err===>", err);
});
```

## sign

用私钥对交易进行离线签名

```
czr.accounts.sign(transHash,privateKey)
    .then(res => {})
    .catch()
```

### 参数

| 字段       | 类型   | 描述              |
| ---------- | ------ | ----------------- |
| transHash  | String | 要签名的交易 Hash |
| privateKey | String | 账户的私钥        |

### 返回结果

签名后的值

### 例子

```
czr.accounts.decrypt(account_keystore, '1234qwer')
    .then(privateKey => {
        console.log('privateKey', privateKey)
        let blockHash='5E844EE4D2E26920F8B0C4B7846929057CFCE48BF40BA269B173648999630053';
        czr.accounts.sign(blockHash, privateKey)
            .then(signature => {
                console.log('signature', signature)
            })
            .catch(console.error)
    })
    .catch(console.error)
```
