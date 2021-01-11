import { Channel, Connection, Options } from 'amqplib/callback_api';
import { ExchangeType } from './ExchangeType';
interface Event {
    exchange: string;
    data: any;
}
export declare abstract class RabbitMQ<T extends Event> {
    protected connection: Connection;
    protected exchangeType?: ExchangeType | undefined;
    abstract exchange: T['exchange'];
    protected queueName: string;
    protected constructor(connection: Connection, exchangeType?: ExchangeType | undefined);
    protected channel: Channel | undefined;
    createChannel(): Promise<this>;
    assertExchange(exchangeOptions?: Options.AssertExchange, callback?: () => void): Promise<this>;
    assertQueue(queueName?: string, queueOptions?: Options.AssertQueue): Promise<this>;
}
export {};
//# sourceMappingURL=RabbitMQ.d.ts.map