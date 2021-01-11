import { Listener, Channel, Message } from '../../../../src';
import { userExchange, UserSignupEvent } from "../common-types";


export class UserSignupListener extends Listener<UserSignupEvent> {
  onMessage(channel: Channel, data: any, msg: Message) {
    // here you can call your business logic methods
    console.log(`User "${data.username}" is just registered, his id is ${data.id}`);
    channel.ack(msg);
  }
  exchange = userExchange;
  pattern = 'orders.create';
  prefetchCount = 1;
}
