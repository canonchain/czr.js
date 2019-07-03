let BigNumber = require('bignumber.js').default;
let bs58check = require("bs58check");

let unitMap = {
    'none': '0',
    'None': '0',
    'king': '1',
    'King': '1',
    'kking': '1000',
    'Kking': '1000',
    'mking': '1000000',
    'Mking': '1000000',
    'gking': '1000000000',
    'Gking': '1000000000',
    'czr': '1000000000000000000',
    'CZR': '1000000000000000000',
};

let decode = require("./helper/decode");

let encode = require("./helper/encode");
// let encode = {};

let encode_account = function (pub) {
    pub = Buffer.from(pub, "hex");
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    return "czr_" + bs58check.encode(v_pub);
}

let isString = function (obj) {
    return typeof obj === 'string' && obj.constructor === String;
};

let isBigNumber = function (object) {
    return (object && object.constructor && object.constructor.name === 'BigNumber');
};

let toBigNumber = function (number) {
    number = number || 0;
    if (isBigNumber(number)) {
        return number;
    }
    if (isString(number) && (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
        return new BigNumber(number.replace('0x', ''), 16);
    }
    return new BigNumber(number.toString(10), 10);
};

let getValueOfUnit = function (unit) {
    unit = unit ? unit.toLowerCase() : 'czr';
    let unitValue = unitMap[unit];
    if (unitValue === undefined) {
        throw new Error('This unit doesn\'t exists, please use the one of the following units' + JSON.stringify(unitMap, null, 2));
    }
    return new BigNumber(unitValue, 10);
};

let fromKing = function (number, unit) {
    let returnValue = toBigNumber(number).dividedBy(getValueOfUnit(unit));
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

let fromKingToken = function (number, precision) {
    let returnValue = toBigNumber(number).dividedBy(precision);
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

let toKing = function (number, unit) {
    let returnValue = toBigNumber(number).times(getValueOfUnit(unit));
    return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

module.exports = {
    toBigNumber: toBigNumber,
    isBigNumber: isBigNumber,

    encode: encode,
    decode: decode,
    encode_account: encode_account,
    fromKing: fromKing,
    fromKingToken: fromKingToken,
    toKing: toKing
};