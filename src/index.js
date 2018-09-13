"use strict";
let version     = require('../package.json').version;
let Accounts    = require('./accounts');
let HttpRequest = require('./httprequest');
let utils       = require('./utils');

let Czr = function (request) {
    if (request) {
        this._request = request;
    }
    this.request = new HttpRequest(this);
};
Czr.prototype={
    constructor:Czr,
    version:version,
    utils:utils,
    accounts:Accounts,
    setRequest:function(request){
        this._request = request;
        // this.api._setRequest(request);
        // this.admin._setRequest(request);
    }
};

module.exports = Czr;

