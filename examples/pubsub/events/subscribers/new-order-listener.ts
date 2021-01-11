import { Listener, Channel, Message } from '../../../../src';
import { NewOrderEvent, orderExchange } from "../common-types";


export class NewOrderListener extends Listener<NewOrderEvent> {
  onMessage(channel: Channel, data: any, msg: Message) {
    // here you can call your business logic methods
    console.log(`User with id ${data.userId} is just bought "${data.items.toString()}" items, the order id is ${data.id}`);
    console.log(data);
    channel.ack(msg);
  }
  exchange = orderExchange;
  pattern = 'users.create';
  prefetchCount = 1;
}
