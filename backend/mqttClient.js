import mqtt from "mqtt";

const mqttHost = "mqtt://broker.hivemq.com";

// Create MQTT client
const client = mqtt.connect(mqttHost);

// Handle connection event
client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

// Handle message event
client.on("message", (topic, message) => {
  if (client.messageHandler) {
    client.messageHandler(topic, message.toString());
  }
});

// Function to publish data
export const publishData = (topic, message) => {
  client.publish(topic, message, (err) => {
    if (err) {
      console.error("Failed to publish message:", err);
    } else {
      console.log(`Message published to ${topic}`);
    }
  });
};

// Function to subscribe to a topic
export const subscribeToTopic = (topic, messageHandler) => {
  client.subscribe(topic, (err) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });

  // Set the message handler for the client
  client.messageHandler = messageHandler;
};

export default client;
