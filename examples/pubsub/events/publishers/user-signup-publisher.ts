import { Publisher } from '../../../../src';
import { userExchange, UserSignupEvent } from "../common-types";


export class UserSignupPublisher extends Publisher<UserSignupEvent> {
  exchange = userExchange;
  routeKey = 'users.create';
}
