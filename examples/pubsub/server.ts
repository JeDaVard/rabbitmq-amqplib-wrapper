import { mqClient } from '../../src';
import { NewOrderListener } from "./events/subscribers/new-order-listener";
import { UserSignupListener } from "./events/subscribers/user-signup-listener";

const signUpEventLogger = () => { console.log('[user-service] Info about a new user is pushed to MQ') }
const newOrderEventLogger = () => { console.log('[order-service] Info about a new order is pushed to MQ') }

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

    const newOrderListener = (
        await (
            await (
                await new NewOrderListener(mqClient.connection).createChannel()
            ).assertExchange()
        )
            .prefetch()
            .assertQueue()
    ).bindQueue();

    userSignupListener.listen(signUpEventLogger);
    newOrderListener.listen(newOrderEventLogger);

    const gracefulSh = () => {
        userSignupListener.close();
        newOrderListener.close();
        process.exit(0);
    };

    process.on('SIGINT', gracefulSh);
    process.on('SIGTERM', gracefulSh);
})();
