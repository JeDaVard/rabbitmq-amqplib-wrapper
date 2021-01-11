export interface UserSignupEvent {
  exchange: string;
  routeKey: string;
  data: {
    id: number,
    username: string
  };
}

export interface NewOrderEvent {
  exchange: string;
  routeKey: string;
  data: {
    id: number;
    items: string[];
    userId: number;
  };
}

export const orderExchange = 'order_exchange';

export const userExchange = 'user_exchange';
