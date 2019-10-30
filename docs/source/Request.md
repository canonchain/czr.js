# RPC请求

## accountBalance

获取指定账户余额

```
request.accountBalance
```

### 请求参数

| 字段    | 类型   | 描述       |
| ------- | ------ | ---------- |
| account | string | 指定的账户 |

### 返回结果

| 字段    | 类型   | 描述     |
| ------- | ------ | -------- |
| code    | string | -        |
| msg     | string | -        |
| balance | string | 账户余额 |

**错误码**

| 名称 | 描述                      |
| ---- | ------------------------- |
| 1    | Invalid account           |
| 100  | Missing parameter account |



## accountBlockList

获取指定账户交易详情

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.accountBlockList
```

### 请求参数

| 字段         | 类型   | 描述                                                |
| ------------ | ------ | --------------------------------------------------- |
| account      | string | 指定查询账户                                        |
| limit `可选` | string | 返回交易上限，如果超过默认 1000，默认 1000          |
| index `可选` | string | 当前查询索引，来自返回结果中的 next_index，默认为空 |

### 返回结果

| 字段       | 类型   | 描述         |
| ---------- | ------ | ------------ |
| code       | string | -            |
| msg        | string | -            |
| blocks     | string | 交易详情列表 |
| next_index | string | 查询索引     |

**错误码**

| 名称 | 描述                                           |
| ---- | ---------------------------------------------- |
| 1    | Invalid account                                |
| 2    | Invalid limit                                  |
| 3    | Limit too large, it can not be large than 1000 |
| 4    | Invalid index                                  |
| 5    | Index not found                                |
| 100  | Missing parameter                              |



## accountChangePwd

修改密码

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.accountChangePwd
```

### 请求参数

| 字段    | 类型   | 描述           |
| ------- | ------ | -------------- |
| account | string | 修改密码的账户 |
| oldPwd  | string | 账户原密码     |
| newPwd  | string | 账户新密码     |

### 返回结果

| 字段  | 类型   | 描述                                   |
| ----- | ------ | -------------------------------------- |
| code  | string | -                                      |
| msg   | string | -                                      |
| valid | string | 验证结果，0：格式不合法，1：格式合法。 |

**错误码**

| 名称 | 描述                                                                                                                                     |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Invalid account                                                                                                                          |
| 2    | Account not found                                                                                                                        |
| 3    | Invalid new password! A valid password length must between 8 and 100                                                                     |
| 4    | Invalid new password! A valid password must contain characters from letters (a-Z, A-Z), digits (0-9) and special characters (!@#\$%^&\*) |
| 5    | Wrong old password                                                                                                                       |
| 100  | Missing parameter                                                                                                                        |



## accountCode

返回给定地址的已编译智能合约代码（如果有）

```
request.accountCode
```

### 请求参数

| 字段    | 类型   | 描述           |
| ------- | ------ | -------------- |
| account | string | 指定的合约账户 |

### 返回结果

| 字段 | 类型   | 描述 |
| ---- | ------ | ---- |
| msg  | string | -    |
| code | string | -    |

**错误码**

| 名称 | 描述            |
| ---- | --------------- |
| 1    | Invalid account |



## accountCreate

生成账户

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.accountCreate
```

### 请求参数

| 字段                 | 类型   | 描述                                                                         |
| -------------------- | ------ | ---------------------------------------------------------------------------- |
| pwd                  | string | 生成账户的密码                                                               |
| gen_next_work `可选` | number | 是否为生成账户的第一笔交易预生成 work 值，0：不预生成，1：预生成。默认为 1。 |

### 返回结果

| 字段 | 类型   | 描述                        |
| ---- | ------ | --------------------------- |
| code | string | 若调用成功，code 返回值为 0 |
| msg  | string | 若调用成功，msg 返回值为 ok |

**错误码**

| 名称 | 描述                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Password can not be empty                                                                                                            |
| 2    | Invalid password! A valid password length must between 8 and 100                                                                     |
| 3    | Invalid password! A valid password must contain characters from letters (a-Z, A-Z), digits (0-9) and special characters (!@#\$%^&\*) |
| 100  | Missing parameter pwd                                                                                                                |



## accountExport

导出账户

```
request.accountExport
```

### 请求参数

| 字段    | 类型   | 描述       |
| ------- | ------ | ---------- |
| account | string | 导出的账户 |

### 返回结果

| 字段 | 类型   | 描述                        |
| ---- | ------ | --------------------------- |
| code | string | 若调用成功，code 返回值为 0 |
| msg  | string | 若调用成功，msg 返回值为 ok |
| json | object | 导出账户的 json             |

**错误码**

| 名称 | 描述              |
| ---- | ----------------- |
| 1    | Invalid account   |
| 2    | Account not found |



## accountImport

导入账户

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.accountImport
```

### 请求参数

| 字段                 | 类型   | 描述                                                                         |
| -------------------- | ------ | ---------------------------------------------------------------------------- |
| jsonFile             | object | 导入账户的 json                                                              |
| gen_next_work `可选` | number | 是否为生成账户的第一笔交易预生成 work 值，0：不预生成，1：预生成。默认为 1。 |

### 返回结果

| 字段    | 类型   | 描述                        |
| ------- | ------ | --------------------------- |
| code    | string | 若调用成功，code 返回值为 0 |
| msg     | string | 若调用成功，msg 返回值为 ok |
| account | string | 导入的账户                  |

**错误码**

| 名称 | 描述                       |
| ---- | -------------------------- |
| 1    | Invalid account            |
| 2    | Invalid json               |
| 100  | Missing parameter jsonFile |



## accountList

```
request.accountList
```

### 返回结果

| 字段     | 类型   | 描述                          |
| -------- | ------ | ----------------------------- |
| code     | string | -                             |
| msg      | string | -                             |
| accounts | object | accounts: {string[]} 账户列表 |



## accountLock

锁定账户

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.accountLock
```

### 请求参数

| 字段    | 类型   | 描述       |
| ------- | ------ | ---------- |
| account | string | 锁定的账户 |
| pwd     | string | 密码       |

### 返回结果

| 字段 | 类型   | 描述                        |
| ---- | ------ | --------------------------- |
| code | string | 若调用成功，code 返回值为 0 |
| msg  | string | 若调用成功，msg 返回值为 ok |

**错误码**

| 名称 | 描述              |
| ---- | ----------------- |
| 1    | Invalid account   |
| 2    | Account not found |
| 100  | Missing parameter |



## accountRemove

删除账户

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.accountRemove
```

### 请求参数

| 字段    | 类型   | 描述       |
| ------- | ------ | ---------- |
| account | string | 删除的账户 |
| pwd     | string | 密码       |

### 返回结果

| 字段 | 类型   | 描述                        |
| ---- | ------ | --------------------------- |
| code | string | 若调用成功，code 返回值为 0 |
| msg  | string | 若调用成功，msg 返回值为 ok |

**错误码**

| 名称 | 描述              |
| ---- | ----------------- |
| 1    | Invalid account   |
| 2    | Account not found |
| 3    | Wrong password    |
| 100  | Missing parameter |



## accountUnlock

解锁账户

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.accountUnlock
```

### 请求参数

| 字段    | 类型   | 描述       |
| ------- | ------ | ---------- |
| account | string | 解锁的账户 |
| pwd     | string | 密码       |

### 返回结果

| 字段 | 类型   | 描述                        |
| ---- | ------ | --------------------------- |
| code | string | 若调用成功，code 返回值为 0 |
| msg  | string | 若调用成功，msg 返回值为 ok |

**错误码**

| 名称 | 描述              |
| ---- | ----------------- |
| 1    | Invalid account   |
| 2    | Account not found |
| 3    | Wrong password    |
| 100  | Missing parameter |



## accountValidate

验证账户格式是否合法

```
request.accountValidate
```

### 请求参数

| 字段       | 类型   | 描述         |
| ---------- | ------ | ------------ |
| accountVal | string | 待验证的账户 |

### 返回结果

| 字段  | 类型   | 描述                                   |
| ----- | ------ | -------------------------------------- |
| code  | string | -                                      |
| msg   | string | -                                      |
| valid | string | 验证结果，0：格式不合法，1：格式合法。 |



## accountsBalances

获取指定多个账户余额

```
request.accountsBalances
```

### 请求参数

| 字段    | 类型  | 描述           |
| ------- | ----- | -------------- |
| account | Array | 指定的多个账户 |

### 返回结果

| 字段     | 类型   | 描述                               |
| -------- | ------ | ---------------------------------- |
| code     | string | -                                  |
| msg      | string | -                                  |
| balances | Object | balances {Object.<string, string>} |

**错误码**

| 名称 | 描述                      |
| ---- | ------------------------- |
| 1    | Invalid account           |
| 100  | Missing parameter account |



## call

获取合约状态

```
request.call
```

### 请求参数

| 字段        | 类型   | 描述                                                                    |
| ----------- | ------ | ----------------------------------------------------------------------- |
| from `可选` | strign | 源账户                                                                  |
| to          | strign | 目标账户                                                                |
| data `可选` | strign | 合约代码或数据                                                          |
| mci `可选`  | strign | mci，接受的值："latest", "earliest" 或数字（如:"1352"）, 默认为"latest" |

### 返回结果

| 字段 | 类型   | 描述 |
| ---- | ------ | ---- |
| cdoe | number | -    |
| msg  | string | -    |

**错误码**

| 名称 | 描述                   |
| ---- | ---------------------- |
| 1    | Invalid from account   |
| 2    | From account not found |
| 3    | Invalid to account     |
| 4    | Invalid data format    |
| 5    | Data size too large    |
| 6    | Invalid mci format     |
| 100  | Missing parameter      |



## estimateGas

预估交易需消耗的 GAS 数量

```
request.estimateGas
```

### 请求参数

| 字段             | 类型   | 描述                                                                             |
| ---------------- | ------ | -------------------------------------------------------------------------------- |
| from `可选`      | strign | 源账户                                                                           |
| to `可选`        | strign | 目标账户                                                                         |
| amount `可选`    | strign | 金额，单位：1\*10<sup>-18</sup>CZR                                               |
| gas `可选`       | strign | 执行交易使用的 gas 上限                                                          |
| gas_price `可选` | strign | gas 价格，单位：1\*10<sup>-18</sup>CZR/gas，手续费 = 实际使用的 gas \_ gas_price |
| data `可选`      | strign | 智能合约代码或数据,默认为空                                                      |
| mci `可选`       | strign | mci，接受的值："latest", "earliest" 或数字（如:"1352"）, 默认为"latest"          |

### 返回结果

| 字段 | 类型   | 描述               |
| ---- | ------ | ------------------ |
| cdoe | number | -                  |
| msg  | string | -                  |
| gas  | string | 预估所需消耗的 gas |

**错误码**

| 名称 | 描述                           |
| ---- | ------------------------------ |
| 1    | Invalid from account           |
| 2    | Invalid to account             |
| 3    | Invalid amount format          |
| 4    | Invalid gas format             |
| 5    | Invalid data format            |
| 6    | Data size too large            |
| 7    | Invalid gas price format       |
| 8    | Invalid mci format             |
| 9    | IGas not enough or excute fail |
| 100  | Missing parameter              |



## generateOfflineBlock

生成未签名的交易，返回交易详情,

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.generateOfflineBlock
```

### 请求参数

| 字段            | 类型   | 描述                                                                             |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| previous `可选` | string | 源账户的上一笔交易 hash,可用于替换无法被打包的交易                               |
| from            | string | 源账户                                                                           |
| to              | string | 目标账户                                                                         |
| amount          | string | 金额，单位：1\*10<sup>-18</sup>CZR                                               |
| gas             | string | 执行交易使用的 gas 上限,未使用完的部分会返回源账户                               |
| gas_price       | string | gas 价格，单位：1\*10<sup>-18</sup>CZR/gas，手续费 = 实际使用的 gas \_ gas_price |
| data `可选`     | string | 智能合约代码或数据,默认为空                                                      |

### 返回结果

| 字段            | 类型   | 描述                                                                             |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| code            | string | -                                                                                |
| msg             | string | -                                                                                |
| hash            | string | 交易 hash                                                                        |
| previous `可选` | string | 源账户的上一笔交易                                                               |
| from            | string | 源账户                                                                           |
| to              | string | 目标账户                                                                         |
| amount          | string | 金额                                                                             |
| gas             | string | 执行交易使用的 gas 上限,未使用完的部分会返回源账户                               |
| gas_price       | string | gas 价格，单位：1\*10<sup>-18</sup>CZR/gas，手续费 = 实际使用的 gas \_ gas_price |

**错误码**

| 名称 | 描述                          |
| ---- | ----------------------------- |
| 1    | Invalid from account          |
| 3    | Invalid to account            |
| 4    | Invalid amount format         |
| 5    | Invalid gas format            |
| 6    | Invalid data format           |
| 7    | Data size too large           |
| 8    | Insufficient balance          |
| 9    | Validate error                |
| 10   | Compose error                 |
| 100  | Missing parameter transaction |
| 110  | transaction not valid         |



## getBlock

获取交易详情

```
request.getBlock
```

### 请求参数

| 字段  | 类型  | 描述                                     |
| ----- | ----- | ---------------------------------------- |
| hashs | Array | 交易哈希列表,不存在的 hash 对应结果 null |

### 返回结果

| 字段   | 类型   | 描述     |
| ------ | ------ | -------- |
| code   | string | -        |
| msg    | string | -        |
| blocks | Array  | 交易详情 |

**错误码**

| 名称 | 描述                |
| ---- | ------------------- |
| 1    | Invalid hash format |



## getBlockState

获取交易详情

```
request.getBlockState
```

### 请求参数

| 字段 | 类型   | 描述     |
| ---- | ------ | -------- |
| hash | string | 交易哈希 |

### 返回结果

| 字段        | 类型   | 描述                                                                                                                       |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| code        | string | -                                                                                                                          |
| msg         | string | -                                                                                                                          |
| block_state | object | 交易状态详情，如果不存在，则为 null, <br/> 更多信息参见 https://github.com/canonchain/canonchain/wiki/JOSN-RPC#block_state |

**错误码**

| 名称 | 描述                |
| ---- | ------------------- |
| 1    | Invalid hash format |



## getBlockStates

批量获取交易状态

```
request.getBlockStates
```

### 请求参数

| 字段  | 类型  | 描述     |
| ----- | ----- | -------- |
| hashs | Array | 交易哈希 |

### 返回结果

| 字段         | 类型   | 描述                                                                                                                       |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| code         | string | -                                                                                                                          |
| msg          | string | -                                                                                                                          |
| block_states | Array  | 交易状态详情，如果不存在，则为 null,<br/> 更多信息参见 https://github.com/canonchain/canonchain/wiki/JOSN-RPC#block_states |

**错误码**

| 名称 | 描述                |
| ---- | ------------------- |
| 1    | Invalid hash format |



## getPastEvents

获取事件信息

等待补充。。。



## sendBlock

发送交易

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.sendBlock
```

### 请求参数

| 字段            | 类型   | 描述                                                                             |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| previous `可选` | string | 源账户的上一笔交易 hash,可用于替换无法被打包的交易                               |
| from            | string | 源账户                                                                           |
| to              | string | 目标账户                                                                         |
| amount          | string | 金额，单位：1\*10<sup>-18</sup>CZR                                               |
| password        | string | 源账户密码                                                                       |
| gas             | string | 执行交易使用的 gas 上限,未使用完的部分会返回源账户                               |
| gas_price       | string | gas 价格，单位：1\*10<sup>-18</sup>CZR/gas，手续费 = 实际使用的 gas \_ gas_price |
| data `可选`     | string | 智能合约代码或数据,默认为空                                                      |

### 返回结果

| 字段 | 类型   | 描述      |
| ---- | ------ | --------- |
| code | string | -         |
| msg  | string | -         |
| hash | string | 交易 hash |

**错误码**

| 名称 | 描述                          |
| ---- | ----------------------------- |
| 1    | Invalid from account          |
| 2    | From account not found        |
| 3    | Invalid to account            |
| 4    | Invalid amount format         |
| 5    | Invalid gas format            |
| 6    | Invalid data format           |
| 7    | Data size too large           |
| 9    | Account locked                |
| 10   | Wrong password                |
| 11   | Insufficient balance          |
| 100  | Missing parameter transaction |
| 110  | transaction not valid         |



## sendOfflineBlock

发送已签名交易，请求参数来自接口 GENERATE_OFFLINE_BLOCK,返回交易哈希,

备注：节点开启时，`enable_control` 需要设置 `true`

```
request.sendOfflineBlock
```

### 请求参数

| 字段            | 类型   | 描述                                                                             |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| previous `可选` | string | 源账户的上一笔交易 hash,可用于替换无法被打包的交易                               |
| from            | string | 源账户                                                                           |
| to              | string | 目标账户                                                                         |
| amount          | string | 金额，单位：1\*10<sup>-18</sup>CZR                                               |
| gas             | string | 执行交易使用的 gas 上限,未使用完的部分会返回源账户                               |
| gas_price       | string | gas 价格，单位：1\*10<sup>-18</sup>CZR/gas，手续费 = 实际使用的 gas \_ gas_price |
| data `可选`     | string | 智能合约代码或数据,默认为空                                                      |
| signature       | string | 交易签名                                                                         |

### 返回结果

| 字段  | 类型   | 描述     |
| ----- | ------ | -------- |
| code  | string | -        |
| msg   | string | -        |
| block | string | 交易详情 |

**错误码**

| 名称 | 描述                     |
| ---- | ------------------------ |
| 1    | Invalid from account     |
| 3    | Invalid to account       |
| 4    | Invalid amount format    |
| 5    | Invalid gas format       |
| 6    | Invalid data format      |
| 7    | Data size too large      |
| 9    | Invalid previous format  |
| 12   | Invalid signature format |
| 100  | Missing parameter        |
| 110  | block not valid          |



## signMsg

签名消息

```
request.signMsg
```

### 请求参数

| 字段       | 类型   | 描述       |
| ---------- | ------ | ---------- |
| public_key | string | 签名公钥   |
| password   | string | 公钥密码   |
| msg        | string | 签名的消息 |

### 返回结果

| 字段      | 类型   | 描述      |
| --------- | ------ | --------- |
| code      | string | -         |
| msg       | string | -         |
| signature | string | 签名 hash |

**错误码**

| 名称 | 描述                      |
| ---- | ------------------------- |
| 1    | Invalid public key format |
| 2    | Invalid msg format        |
| 3    | Wrong password            |
| 100  | Missing parameter         |



## stableBlocks

获取已稳定的指定 MCI 下的多笔交易

```
request.stableBlocks
```

### 请求参数

| 字段         | 类型   | 描述                                                            |
| ------------ | ------ | --------------------------------------------------------------- |
| limit        | number | 回交易上限，最大 1000                                           |
| index `可选` | string | 第一个 block 的 stable_index，可取结果中的 next_index，默认为 0 |

### 返回结果

| 字段       | 类型   | 描述                                                |
| ---------- | ------ | --------------------------------------------------- |
| cdoe       | number | -                                                   |
| msg        | string | -                                                   |
| blocks     | Array  | 交易状态详情                                        |
| next_index | number | 下一个 block 的 stable_index，后续没有数据时为 null |

**错误码**

| 名称 | 描述                                           |
| ---- | ---------------------------------------------- |
| 1    | Invalid index format                           |
| 2    | Invalid limit format                           |
| 3    | Limit too large, it can not be large than 1000 |



## status

获取当前节点的最大稳定主链 INDEX，最大主链 INDEX

```
request.status
```

### 返回结果

| 字段                    | 类型   | 描述                                                                                   |
| ----------------------- | ------ | -------------------------------------------------------------------------------------- |
| cdoe                    | number | -                                                                                      |
| msg                     | string | -                                                                                      |
| syncing                 | number | 0：未同步，1：同步中                                                                   |
| last_mci                | number | 最大主链 index                                                                         |
| last_stable_block_index | number | 最大稳定交易的 index, 稳定交易的 index 从 0 开始依次递增，表示每笔交易稳定后的全局顺序 |



## stop

停止程序

```
request.stop
```

### 返回结果

| 字段 | 类型   | 描述 |
| ---- | ------ | ---- |
| cdoe | number | -    |
| msg  | string | -    |



## version

获取当前节点后台程序版本号，RPC 版本号，数据库版本号

```
request.version
```

### 返回结果

| 字段          | 类型   | 描述 |
| ------------- | ------ | ---- |
| cdoe          | number | -    |
| msg           | string | -    |
| version       | string | -    |
| rpc_version   | string | -    |
| store_version | string | -    |



## witnessList

获取见证人列表

```
request.witnessList
```

### 返回结果

| 字段         | 类型   | 描述       |
| ------------ | ------ | ---------- |
| cdoe         | number | -          |
| msg          | string | -          |
| witness_list | Array  | 见证人列表 |


