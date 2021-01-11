import { Connection, Message, Channel } from 'amqplib/callback_api';
import { ExchangeType } from './ExchangeType';
import { RabbitMQ } from './RabbitMQ';
interface Event {
    exchange: string;
    data: any;
}
export declare abstract class Listener<T extends Event> extends RabbitMQ<T> {
    protected connection: Connection;
    protected exchangeType?: ExchangeType | undefined;
    abstract onMessage(channel: Channel, data: T['data'], msg: Message): void;
    constructor(connection: Connection, exchangeType?: ExchangeType | undefined);
    prefetch(prefetchCount?: number): Listener<T>;
    bindQueue(pattern?: string): this;
    listen(): void;
    parseMessage(msg: Message): string;
    close(): void;
}
export {};
//# sourceMappingURL=Listener.d.ts.map