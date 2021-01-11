import { Listener, Channel, Message } from '../../../../src';
import { NewOrderEvent, orderExchange } from "../common-types";


export class NewOrderListener extends Listener<NewOrderEvent> {
  onMessage(channel: Channel, data: any, msg: Message) {
    console.log(data);
    channel.ack(msg);
  }
  exchange = orderExchange;
  pattern = 'users.create';
  prefetchCount = 1;
}
