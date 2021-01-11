import { mqClient } from '../../src';
import { UserSignupPublisher } from './events/publishers/user-signup-publisher';
import { NewOrderPublisher } from './events/publishers/new-order-publisher';

(async function () {
    await mqClient.connect('amqp://localhost');

    const userSignupListener = await (
        await new UserSignupPublisher(mqClient.connection).createChannel()
    ).assertExchange();

    const newOrderPublisher = await (
      await new NewOrderPublisher(mqClient.connection).createChannel()
    ).assertExchange();

    try {
        setInterval(() => {
            userSignupListener.publish('new user');
            newOrderPublisher.publish('new order');
        }, 2000);
    } catch (e) {
        console.log(e);
    }
})();
