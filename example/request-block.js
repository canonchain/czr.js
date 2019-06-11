/**
 * @author fangke
 * 2019/1/30
 */

const Czr = require('../src/index')
const czr = new Czr()

/**
 * version
 * */
// czr.request.version()
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取当前节点的所有账户
 * */
// czr.request.accountList()
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret, '\n')
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 发送交易
 * sendBlock
 * */
// czr.request.sendBlock({
//     "from": "czr_4M3zGYDwWVkhsoP1FxMiuaKyRtc2wQFUDchbMQCkW2q2UmwroX",
//     "to": "czr_4XeMPvNwNbJPruZJdrMQLEJpng22QaPDbNFcrKpdLxEewEPZQT",
//     "amount": '0',
//     "password": "12345678",
//     "gas": '0',
//     "data": ""
// })
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 生成未签名的交易，返回交易详情
 * generateOfflineBlock
 * */
// czr.request.generateOfflineBlock({
//     from: 'czr_4M3zGYDwWVkhsoP1FxMiuaKyRtc2wQFUDchbMQCkW2q2UmwroX',
//     to: 'czr_4XeMPvNwNbJPruZJdrMQLEJpng22QaPDbNFcrKpdLxEewEPZQT',
//     amount: '0',
//     gas: '0',
// })
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 签名消息
 * signMsg
 * */
// czr.request.signMsg('czr_4M3zGYDwWVkhsoP1FxMiuaKyRtc2wQFUDchbMQCkW2q2UmwroX', '12345678', 'F310B56BABE79E8F6DFDE423EA261132F9901D0394070237307A10FFC2BBB06A')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 发送已签名交易
 * sendOfflineBlock
 * */
// czr.request.sendOfflineBlock({
//     code: '0',
//     msg: 'OK',
//     hash: 'F310B56BABE79E8F6DFDE423EA261132F9901D0394070237307A10FFC2BBB06A',
//     from: 'czr_4M3zGYDwWVkhsoP1FxMiuaKyRtc2wQFUDchbMQCkW2q2UmwroX',
//     to: 'czr_4XeMPvNwNbJPruZJdrMQLEJpng22QaPDbNFcrKpdLxEewEPZQT',
//     amount: '0',
//     previous: 'BA87E5C6D13FFCF12D4EBB4BAB541B431CC789A45CAD43871F6FAE90B556E26D',
//     gas: '0',
//     data: '',
//     exec_timestamp: '1548833884',
//     work: '7BAB2E478AD92651',
//     signature: 'D652E79C1E6A249217803E30BB4988D576A68D5747DC751EB2DC1ED4F54716CF239363B37A4ED92611FDE7256B425B3AF250E51B920AB547D5A6C3636C546D00'
// })
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取交易详情
 * getBlock
 * */
// czr.request.getBlock('DD4673A78E6246F298B95DCC3F73990D8F0CCA252F24EA79BCA2D6FE5611D9E4')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 批量获取交易详情
 * getBlocks
 * */
// czr.request.getBlocks([
//     'DD4673A78E6246F298B95DCC3F73990D8F0CCA252F24EA79BCA2D6FE5611D9E4'
// ])
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取已稳定的指定mci下的多笔交易
 * stableBlocks
 * TODO explorer
 * */
// czr.request.stableBlocks(0)
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 返回未稳定交易详情
 * unstableBlocks
 * TODO explorer
 * */
// czr.request.unstableBlocks()
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取当前节点的最大稳定主链index，最大主链index。
 * status
 * */
// czr.request.status()
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取见证人列表
 * witnessList
 * */
// czr.request.witnessList()
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取指定账户预生成的work
 * getWork
 * */
// czr.request.getWork('czr_3VUEhUFFG7anjTPwgxDEwZAGnwxYYSrDTmxhiMrfQYmmx5MJX4')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 获取指定交易的状态state
 */
// czr.request.getBlockState('1BE9E6B29AD56A2E36851176E5C67A180BA46875F03C5742427D2CD51D81306A')
//     .then(ret => {
//         if (ret.code === 0) {
//             console.log('request success =>', ret)
//         } else {
//             console.log('request failed =>', ret)
//         }
//     })
//     .catch(err => console.log)

/**
 * 批量获取指定交易的状态state
 */
czr.request.getBlockStates(['1BE9E6B29AD56A2E36851176E5C67A180BA46875F03C5742427D2CD51D81306A',"484A3C6D08BEA39C5F69B58CC5765253BC449C6A15101A042819768CAD4AE8C0"])
    .then(ret => {
        if (ret.code === 0) {
            console.log('request success =>', ret)
        } else {
            console.log('request failed =>', ret)
        }
    })
    .catch(err => console.log)