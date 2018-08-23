"use strict";
let version = require('../package.json').version;
let Accounts = require('./accounts');
let Czr = function Web3() {
};

Czr.version = version;
Czr.accounts = Accounts;

module.exports = Czr;

