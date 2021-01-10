import { Publisher } from '../../src';

interface SomeEvent {
    exchange: string;
    routeKey: string;
    data: string;
}

export class SomePublisher extends Publisher<SomeEvent> {
    exchange: SomeEvent['exchange'] = 'someExchange';
    publishOptions = {};
    routeKey: SomeEvent['routeKey'] = 'someDomain';
}
