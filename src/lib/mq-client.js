"use strict";
exports.__esModule = true;
exports.mqClient = void 0;
var callback_api_1 = require("amqplib/callback_api");
var MqClient = /** @class */ (function () {
    function MqClient() {
    }
    Object.defineProperty(MqClient.prototype, "connection", {
        get: function () {
            if (!this._connection) {
                throw new Error('[ERROR] There is no connection. You need to connect first.');
            }
            return this._connection;
        },
        enumerable: false,
        configurable: true
    });
    MqClient.prototype.connect = function (url, callback) {
        var _this = this;
        if (this._connection)
            this._connection.close();
        return new Promise(function (resolve, reject) {
            callback_api_1.connect(url, function (err, connection) {
                if (err)
                    reject(err);
                _this._connection = connection;
                if (callback)
                    callback();
                resolve(_this._connection);
            });
        });
    };
    return MqClient;
}());
var mqClient = new MqClient();
exports.mqClient = mqClient;
