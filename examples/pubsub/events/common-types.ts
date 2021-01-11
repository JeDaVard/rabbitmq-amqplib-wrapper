export interface UserSignupEvent {
  exchange: string;
  routeKey: string;
  data: any;
}

export interface NewOrderEvent {
  exchange: string;
  routeKey: string;
  data: any;
}

export const orderExchange = 'order_exchange';

export const userExchange = 'user_exchange';
