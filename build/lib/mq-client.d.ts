import { Connection, Options } from 'amqplib/callback_api';
declare class MqClient {
    private _connection?;
    get connection(): Connection;
    connect(url: string | Options.Connect, callback?: () => void): Promise<unknown>;
}
declare const mqClient: MqClient;
export { mqClient };
//# sourceMappingURL=mq-client.d.ts.map