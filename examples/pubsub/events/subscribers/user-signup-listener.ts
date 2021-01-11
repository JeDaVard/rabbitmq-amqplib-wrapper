import { Listener, Channel, Message } from '../../../../src';
import { userExchange, UserSignupEvent } from "../common-types";


export class UserSignupListener extends Listener<UserSignupEvent> {
  onMessage(channel: Channel, data: any, msg: Message) {
    console.log(data);
    channel.ack(msg);
  }
  exchange = userExchange;
  pattern = 'orders.create';
  prefetchCount = 1;
}
