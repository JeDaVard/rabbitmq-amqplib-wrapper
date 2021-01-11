import { mqClient } from '../../src';
import { UserSignupPublisher } from './events/publishers/user-signup-publisher';
import { NewOrderPublisher } from './events/publishers/new-order-publisher';

import { Order, User } from "./dummy-data";
const signUpPubLogger = () => { console.log('[user-service] Info about a new user is pushed to MQ') }
const newOrderPubLogger = () => { console.log('[order-service] Info about a new order is pushed to MQ') }

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
            userSignupListener.publish(new User(), signUpPubLogger);
            newOrderPublisher.publish(new Order(), newOrderPubLogger);
        }, 2000);
    } catch (e) {
        console.log(e);
    }
})();
