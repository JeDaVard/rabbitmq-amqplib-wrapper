"use strict";
exports.__esModule = true;
exports.RabbitMQ = void 0;
var RabbitMQ = /** @class */ (function () {
    function RabbitMQ(connection, exchangeType) {
        this.connection = connection;
        this.exchangeType = exchangeType;
        this.exchange = '';
        this.queueName = '';
    }
    RabbitMQ.prototype.createChannel = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.createChannel(function (error, channel) {
                if (error)
                    reject(error);
                _this.channel = channel;
                resolve(_this);
            });
        });
    };
    RabbitMQ.prototype.assertExchange = function (exchangeOptions, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.channel) {
                reject('[ERROR] There is no channel, please create before this action.');
                return;
            }
            _this.channel.assertExchange(_this.exchange, _this.exchangeType || 'fanout', exchangeOptions, function (err, assertExchange) {
                if (err)
                    return reject(err);
                _this.exchange = assertExchange.exchange;
                if (callback)
                    callback();
                resolve(_this);
            });
        });
    };
    RabbitMQ.prototype.assertQueue = function (queueName, queueOptions) {
        var _this = this;
        if (queueName === void 0) { queueName = ''; }
        return new Promise(function (resolve, reject) {
            if (!_this.channel) {
                reject("[ERROR] Listener doesn't have a channel. You must create it first using createChannel async method.");
                return;
            }
            _this.channel.assertQueue(queueName, queueOptions, function (err, assertQueue) {
                if (err)
                    reject();
                _this.queueName = assertQueue.queue;
                resolve(_this);
            });
        });
    };
    return RabbitMQ;
}());
exports.RabbitMQ = RabbitMQ;
