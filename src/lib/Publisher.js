"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Publisher = void 0;
var RabbitMQ_1 = require("./RabbitMQ");
var Publisher = /** @class */ (function (_super) {
    __extends(Publisher, _super);
    function Publisher(connection, exchangeType) {
        var _this = _super.call(this, connection, exchangeType) || this;
        _this.connection = connection;
        _this.exchangeType = exchangeType;
        return _this;
    }
    Publisher.prototype.publish = function (data, publishOptions, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.channel) {
                reject('[ERROR] There is no channel, please create before this action.');
                return;
            }
            var pubRes = _this.channel.publish(_this.exchange, _this.routeKey, Buffer.from(data), publishOptions);
            if (pubRes && callback) {
                callback();
                resolve(true);
                return;
            }
            resolve(false);
        });
    };
    Publisher.prototype.close = function () {
        // You can write here other clean-ups
        this.connection.close();
    };
    return Publisher;
}(RabbitMQ_1.RabbitMQ));
exports.Publisher = Publisher;
