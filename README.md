## Rabbitmq Amqplib Wrapper
Welcome 👋

<img src="https://codefibershq.com/assets/blog/node-rabbit.jpg" alt="drawing" width="300"/>

### Introduction
RabbitMQ is the most popular of its kind, because it's very fast and relatively easy to work with, and Node.js is born for ultrafast event exchanges. For this pair of beasts you have amqplib library, but it requires a ton of implementation and boilerplate to be used in enterprise wide production architecture.

### Description
I created this library to make rabbitMQ easy to integrate in Node.js microservice architecture by providing static type support, maintainable and extensible interfaces, and better developer experience.
This library itself is in alpha condition, for advanced cases it requires to be extended by taking into account the rabbitMQ gotchas, but this is a modern library written in TypeScript OOP principals in mind, in a compare of an advanced and mature [Rascal](https://www.npmjs.com/package/rascal) wrapper.

### How to run the example
0. Make sure you have [Docker desktop]('https://www.docker.com/products/docker-desktop') up and running
1. Clone the repo
2. Open the terminal and go to the project directory
3. Run `npm i` and wait to the end of dependency installation
4. Run `npm run docker`
5. open two terminal windows, run `npm run client` in the first window
6. run `npm run server` in the second window

Every 2 seconds client will publish preconfigured dummy events, and the server will show it.


### Problems to be solved
Here I decided to use builder design pattern for the sake of usage ease and readability, but the problem is that we have asynchronous methods, accordingly we have to await before the next chain member. I eventually implemented so, but it's a subject for further changes 

[as]: https://www.npmjs.com/package/rascal
