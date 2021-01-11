import faker from 'faker';

let userRandomIdStarter = Math.round(Math.random() * 10000);
let orderRandomIdStarter = Math.round(Math.random() * 10000);

export class User {
    id = userRandomIdStarter++;
    username = (faker.name.findName() + ' ' + faker.name.lastName()).split(' ').join('_');
}

export class Order {
    id = orderRandomIdStarter++;
    userId = faker.random.number(10000);
    items = faker.random.words().split(' ');
}
