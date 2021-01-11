import { Connection, Options } from 'amqplib/callback_api';
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

    publish(data: T['data'], callback?: () => void): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.channel) {
                reject(
                    '[ERROR] There is no channel, please create before this action.'
                );
                return;
            }
            const pubRes = this.channel.publish(
                this.exchange,
                this.routeKey,
                Buffer.from(data),
                this.publishOptions
            );

            if (pubRes && callback) {
                callback();
                resolve(true);
                return;
            }
            resolve(false);
        });
    }

    close() {
        // You can write here other clean-ups
        this.connection.close();
    }
}
