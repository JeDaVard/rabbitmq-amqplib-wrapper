import { connect, Connection, Options } from 'amqplib';

class MqClient {
    private _connection?: Connection;

    get connection() {
        if (!this._connection) {
            throw new Error(
                '[ERROR] There is no connection. You need to connect first.'
            );
        }
        return this._connection;
    }

    async connect(url: string | Options.Connect, callback?: () => void) {
        if (this._connection) await this._connection.close();

        this._connection = await connect(url)

        if (callback) callback();

        return this._connection
    }
}

const mqClient = new MqClient();
export { mqClient };
