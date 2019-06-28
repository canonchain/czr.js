/**
 * @author fangke
 * 2019/1/29
 */

const Czr = require('../src/index')
const czr = new Czr()

/**
 * 获取当前节点的所有账户
 * */
// czr.request.accountList()
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 生成账户
 * */
// czr.request.accountCreate('12345678')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 删除账户
 * */
// czr.request.accountRemove('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4','12345678')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 解锁账户
 * */
// czr.request.accountUnlock('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4','12345678')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 锁定账户
 * */
// czr.request.accountLock('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 导出账户
 * */
// czr.request.accountExport('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/* '{"account":"czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4","kdf_salt":"93A5D750F554808DBD57B2F0960932B0","iv":"A26
30746A07EE5D2147688A85C1CF261","ciphertext":"2AFFC04EA554C3F6E9F7A3A8B95049F31DC9AFF4B862621C8414B3C16148516E"}' */
/**
 * 导入账户
 * */
// czr.request.accountImport('{"account":"czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4","kdf_salt":"93A5D750F554808DBD57B2F0960932B0","iv":"A2630746A07EE5D2147688A85C1CF261","ciphertext":"2AFFC04EA554C3F6E9F7A3A8B95049F31DC9AFF4B862621C8414B3C16148516E"}')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 验证账户格式是否合法
 * accountValidate
 * */
// czr.request.accountValidate('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 修改密码
 * accountChangePwd
 * */
// czr.request.accountChangePwd('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4','12345678','87654321')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取指定账户交易详情
 * accountBlockList
 * */
// czr.request.accountBlockList('czr_4M3zGYDwWVkhsoP1FxMiuaKyRtc2wQFUDchbMQCkW2q2UmwroX')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取指定账户余额
 * accountBalance
 * */
// czr.request.accountBalance('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取指定多个账户余额
 * accountsBalances
 * */
// czr.request.accountsBalances(['czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4','czr_4ZAap6Meaoo33ToqFh3DRW7vtGMiWD2fjQLAZJfDTBY2kRx9iz'])
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 返回给定地址的已编译智能合约代码（如果有）
 * accountCode
 */
czr.request.accountCode("czr_2yApC5jCY29eb8kfDE95zj2RRqajma4UQmBnvJdcWNoZZVr1uz")
    .then(ret => {
        if (ret.code === 0) {
            console.log('request success =>', ret)
        } else {
            console.log('request failed =>', ret)
        }
    })
    .catch(err => console.log)
