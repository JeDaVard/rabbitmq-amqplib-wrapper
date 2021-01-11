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
exports.Listener = void 0;
var RabbitMQ_1 = require("./RabbitMQ");
var Listener = /** @class */ (function (_super) {
    __extends(Listener, _super);
    function Listener(connection, exchangeType) {
        var _this = _super.call(this, connection, exchangeType) || this;
        _this.connection = connection;
        _this.exchangeType = exchangeType;
        return _this;
    }
    Listener.prototype.prefetch = function (prefetchCount) {
        if (prefetchCount === void 0) { prefetchCount = 1; }
        if (!this.channel)
            throw new Error("[ERROR] Listener doesn't have a channel. You must create it first using createChannel async method.");
        this.channel.prefetch(prefetchCount);
        return this;
    };
    Listener.prototype.bindQueue = function (pattern) {
        if (pattern === void 0) { pattern = '*'; }
        if (!this.channel)
            throw new Error("[ERROR] Listener doesn't have a channel. You must create it first using createChannel async method.");
        this.channel.bindQueue(this.queueName, this.exchange, pattern);
        return this;
    };
    Listener.prototype.listen = function () {
        var _this = this;
        if (!this.channel)
            throw new Error("[ERROR] Listener doesn't have a channel. You must create it first using createChannel async method.");
        this.channel.consume(this.queueName, function (msg) {
            if (!!msg) {
                _this.onMessage(_this.channel, msg.content.toString(), msg);
            }
        }, {
            noAck: false
        });
    };
    Listener.prototype.parseMessage = function (msg) {
        var data = msg.content;
        return data.toString();
        // return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
    };
    Listener.prototype.close = function () {
        // You can write here other clean-ups
        this.connection.close();
    };
    return Listener;
}(RabbitMQ_1.RabbitMQ));
exports.Listener = Listener;
