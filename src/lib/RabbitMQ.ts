import { Channel, Connection, Options } from 'amqplib';
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
        if (!this._channel)
            throw new Error(
                'Channel is possibly not created yet. Please create it first.'
            );
        return this._channel;
    }

    async createChannel(): Promise<this> {
        this._channel = await this.connection.createChannel();
        return this;
    }

    async assertExchange(callback?: () => void): Promise<this> {
        const assertExchange = await this.channel.assertExchange(
            this.exchange,
            this.exchangeType || 'fanout',
            this.exchangeOptions
        );

        this.exchange = assertExchange.exchange;
        if (callback) callback();
        return this;
    }

    async assertQueue(
        queueName = '',
        queueOptions?: Options.AssertQueue
    ): Promise<this> {
        const assertQueue = await this.channel.assertQueue(
            queueName,
            queueOptions
        );
        this.queueName = assertQueue.queue;
        return this;
    }
}
