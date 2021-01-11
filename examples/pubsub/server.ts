import { mqClient } from '../../src';
import { NewOrderListener } from "./events/subscribers/new-order-listener";
import { UserSignupListener } from "./events/subscribers/user-signup-listener";


(async function () {
    await mqClient.connect('amqp://localhost');

    const userSignupListener = (
      await (
        await (
          await new UserSignupListener(mqClient.connection).createChannel()
        ).assertExchange()
      )
        .prefetch()
        .assertQueue()
    ).bindQueue();

    userSignupListener.listen();

    const newOrderListener = (
        await (
            await (
                await new NewOrderListener(mqClient.connection).createChannel()
            ).assertExchange()
        )
            .prefetch()
            .assertQueue()
    ).bindQueue();

    newOrderListener.listen();

    const gracefulSh = () => {
        userSignupListener.close();
        newOrderListener.close();
        process.exit(0);
    };

    process.on('SIGINT', gracefulSh);
    process.on('SIGTERM', gracefulSh);
})();
