import { Connection, Message, Channel } from 'amqplib';
import { ExchangeType } from './ExchangeType';
import { RabbitMQ } from './RabbitMQ';

interface Event {
    exchange: string;
    data: any;
}

export abstract class Listener<T extends Event> extends RabbitMQ<T> {
    abstract onMessage(channel: Channel, data: T['data'], msg: Message): void;
    abstract pattern = '*';
    protected prefetchCount = 1;

    public constructor(
        protected connection: Connection,
        protected exchangeType?: ExchangeType
    ) {
        super(connection, exchangeType);
    }

    async prefetch(): Promise<this> {
        await this.channel.prefetch(this.prefetchCount);
        return this;
    }

    async bindQueue(): Promise<this> {
        await this.channel.bindQueue(this.queueName, this.exchange, this.pattern);
        return this;
    }

    async listen(callback?: () => void) {
        await this.channel.consume(
            this.queueName,
            (msg) => {
                if (!!msg) {
                    if (callback) callback();
                    this.onMessage(this.channel, this.parseMessage(msg), msg);
                }
            },
            {
                noAck: false,
            }
        );
    }

    parseMessage(msg: Message) {
        const data = msg.content.toString();
        return JSON.parse(data)
        // return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
    }

    async close() {
        // You can write here other clean-ups
        await this.connection.close();
    }
}
