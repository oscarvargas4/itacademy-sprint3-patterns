var amqp = require("amqplib/callback_api");

class Subscriber {
  readMessages(queueName) {
    // Setting up is the same as the publisher; we open a connection and a
    // channel, and declare the queue from which we're going to consume.
    // Note this matches up with the queue that sendToQueue publishes to.
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = "hello";

        channel.assertQueue(queueName, {
          durable: false,
        });

        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );

        channel.consume(
          queue,
          function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
          },
          {
            noAck: true,
          }
        );
      });
    });
  }
}


const omar = new Subscriber();
omar.readMessages("hello");