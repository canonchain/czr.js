"use strict";
let version     = require('../package.json').version;
let Accounts    = require('./accounts');
let HttpRequest = require('./httprequest');
let utils       = require('./utils');

let Czr = function (request) {
    // if (request) {
    //     this._request = request;
    // }
    this.request = new HttpRequest(this);
};
Czr.prototype={
    constructor:Czr,
    version:version,
    utils:utils,
    accounts:Accounts
};

module.exports = Czr;

