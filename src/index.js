"use strict";
let version = require('../package.json').version;
let Accounts = require('./accounts');
let HttpRequest = require('./httprequest');
let utils = require('./utils');
let abi = require('./abi');
let Contract = require('./contract');

let Czr = function (request) {
    // if (request) {
    //     this._request = request;
    // }
    if (request) {
        this.dev = (request.dev === true) ? true : false;
        this.host = request.host ? request.host : '127.0.0.1';
        this.port = request.port ? request.port : '8765';
    } else {
        this.dev = false;
    }

    this.request = new HttpRequest({
        host: this.host,
        port: this.port
    });
    this.accounts = new Accounts(this.dev);
};
Czr.prototype = {
    constructor: Czr,
    version: version,
    utils: utils,
    abi: abi,
    Contract: Contract
};

module.exports = Czr;

