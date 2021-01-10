import { mqClient, Listener, Channel, Message } from '../../src';

interface SomeEvent {
    exchange: string;
    routeKey: string;
    data: any;
}

(async function () {
    await mqClient.connect('amqp://localhost');

    class Lis extends Listener<SomeEvent> {
        onMessage(channel: Channel, data: any, msg: Message) {
            console.log(data);
            channel.ack(msg);
        }
        exchange = 'someExchange';
    }

    const listener = (
        await (
            await (
                await new Lis(mqClient.connection).createChannel()
            ).assertExchange()
        )
            .prefetch()
            .assertQueue()
    ).bindQueue();

    listener.listen();

    const gracefulSh = () => {
        listener.close();
        process.exit(0);
    };

    process.on('SIGINT', gracefulSh);
    process.on('SIGTERM', gracefulSh);
})();
