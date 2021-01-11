import { Publisher } from "../../../../src";
import { NewOrderEvent, orderExchange } from "../common-types";


export class NewOrderPublisher extends Publisher<NewOrderEvent> {
    exchange = orderExchange;
    routeKey = 'orders.create';
}
