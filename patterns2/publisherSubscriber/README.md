# Publisher & Subscriber with RabbitMQ

## Execution
To execute this app, you must execute first send.js file, and then (in other console) execute receive.js file.

Be sure to have installed RabbitMQ (https://www.rabbitmq.com/download.html) with Erlang (https://www.erlang.org/downloads)

## RabbitMQ "Hello World" example

### Prerequisites
This tutorial assumes RabbitMQ is installed and running on localhost on the standard port (15672). In case you use a different host, port or credentials, connections settings would require adjusting.

## Introduction
RabbitMQ is a message broker: it accepts and forwards messages. You can think about it as a post office: when you put the mail that you want posting in a post box, you can be sure that the letter carrier will eventually deliver the mail to your recipient. In this analogy, RabbitMQ is a post box, a post office, and a letter carrier.

The major difference between RabbitMQ and the post office is that it doesn't deal with paper, instead it accepts, stores, and forwards binary blobs of data ‒ messages.

+ Producing means nothing more than sending. A program that sends messages is a producer
+ A queue is the name for a post box which lives inside RabbitMQ. Although messages flow through RabbitMQ and your applications, they can only be stored inside a queue. A queue is only bound by the host's memory & disk limits, it's essentially a large message buffer. Many producers can send messages that go to one queue, and many consumers can try to receive data from one queue. This is how we represent a queue
+ Consuming has a similar meaning to receiving. A consumer is a program that mostly waits to receive messages

Note that the producer, consumer, and broker do not have to reside on the same host; indeed in most applications they don't. An application can be both a producer and consumer, too.

In this part of the tutorial we'll write two small programs in Javascript; a producer that sends a single message, and a consumer that receives messages and prints them out. We'll gloss over some of the detail in the amqp.node API, concentrating on this very simple thing just to get started. It's a "Hello World" of messaging.

In the diagram below, "P" is our producer and "C" is our consumer. The box in the middle is a queue - a message buffer that RabbitMQ keeps on behalf of the consumer.

First, install amqp.node using npm:
```
npm install amqplib
```

For all other instructions: https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html


## RABBITMQ INSTALLATION AND EXAMPLES:
1. https://www.youtube.com/watch?v=V9DWKbalbWQ
2. https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
