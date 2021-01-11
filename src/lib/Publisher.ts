import { Connection, Options } from 'amqplib';
import { RabbitMQ } from './RabbitMQ';
import { ExchangeType } from './ExchangeType';

interface Event {
    exchange: string;
    routeKey: string;
    data: any;
}

export abstract class Publisher<T extends Event> extends RabbitMQ<T> {
    abstract routeKey: T['routeKey'];
    protected publishOptions?: Options.Publish;

    public constructor(
        protected connection: Connection,
        protected exchangeType?: ExchangeType
    ) {
        super(connection, exchangeType);
    }

    async publish(data: T['data'], callback?: () => void): Promise<boolean> {
            const res = this.channel.publish(
                this.exchange,
                this.routeKey,
                Buffer.from(JSON.stringify(data)),
                this.publishOptions
            );

            if (res && callback) {
                callback();
            }

            return res;
    }

    async close() {
        // You can write here other clean-ups
        await this.connection.close();
    }
}
