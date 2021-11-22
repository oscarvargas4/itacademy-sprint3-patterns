var amqp = require("amqplib/callback_api");

// connect to RabbitMQ server
amqp.connect("amqp://localhost", function (error0, connection) {});

class Publisher {
  sendMessage(queueName, messageText) {
    // we create a channel, which is where most of the API for getting things done resides
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }

      // To send, we must declare a queue for us to send to; then we can publish a message to the queue:
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = queueName;
        var msg = messageText;

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
      });

      setTimeout(function () {
        connection.close();
        process.exit(0);
      }, 500);
    });
  }
}

const oscar = new Publisher();
oscar.sendMessage("hello", "I'm Oscar from IT Academy and I'm testing RabbitMQ");
oscar.sendMessage("hello", "I hope today to finish patterns module");
