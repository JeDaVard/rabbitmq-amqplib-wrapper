import { Connection, Options } from 'amqplib/callback_api';
import { RabbitMQ } from './RabbitMQ';
import { ExchangeType } from './ExchangeType';
interface Event {
    exchange: string;
    routeKey: string;
    data: any;
}
export declare abstract class Publisher<T extends Event> extends RabbitMQ<T> {
    protected connection: Connection;
    protected exchangeType?: ExchangeType | undefined;
    abstract routeKey: T['routeKey'];
    constructor(connection: Connection, exchangeType?: ExchangeType | undefined);
    publish(data: T['data'], publishOptions?: Options.Publish, callback?: () => void): Promise<boolean>;
    close(): void;
}
export {};
//# sourceMappingURL=Publisher.d.ts.map