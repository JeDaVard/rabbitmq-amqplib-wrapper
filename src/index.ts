// re-export necessary types from the original lib
export { Channel, Message, Options } from 'amqplib';

// export client
export { mqClient } from './lib/mq-client'

// Export base classes
export * from './lib/Publisher'
export * from './lib/Listener'
