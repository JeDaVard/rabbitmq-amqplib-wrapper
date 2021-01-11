import { Channel, Connection, Options } from 'amqplib/callback_api';
import { ExchangeType } from './ExchangeType';

interface Event {
    exchange: string;
    data: any;
}

export abstract class RabbitMQ<T extends Event> {
    abstract exchange: T['exchange'] = '';
    protected exchangeOptions?: Options.AssertExchange;
    protected queueName = '';

    protected constructor(
        protected connection: Connection,
        protected exchangeType?: ExchangeType
    ) {}

    protected _channel: Channel | undefined;

    get channel(): Channel {
        if (!this._channel) throw new Error('Channel is possibly not created yet. Please create it first.')
        return this._channel
    }

    createChannel(): Promise<this> {
        return new Promise((resolve, reject) => {
            this.connection.createChannel((error, channel) => {
                if (error) reject(error);
                this._channel = channel;
                resolve(this);
            });
        });
    }

    assertExchange(
        callback?: () => void
    ): Promise<this> {
        return new Promise((resolve, reject) => {
            this.channel.assertExchange(
                this.exchange,
                this.exchangeType || 'fanout',
                this.exchangeOptions,
                (err, assertExchange) => {
                    if (err) return reject(err);
                    this.exchange = assertExchange.exchange;
                    if (callback) callback();
                    resolve(this);
                }
            );
        });
    }
    assertQueue(
        queueName = '',
        queueOptions?: Options.AssertQueue
    ): Promise<this> {
        return new Promise<this>((resolve, reject) => {
            this.channel.assertQueue(
                queueName,
                queueOptions,
                (err, assertQueue) => {
                    if (err) reject();
                    this.queueName = assertQueue.queue;
                    resolve(this);
                }
            );
        });
    }
}
