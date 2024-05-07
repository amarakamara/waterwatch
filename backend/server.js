import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import pkg from "mongoose";
const { ServerApiVersion } = pkg;
import passport from "passport";
import cors from "cors";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
import passportLocalMongoose from "passport-local-mongoose";

const thingSpeakChannel = process.env.CHANNEL_ID;
const thingSpeakReadKey = process.env.READ_KEY;
const thingSpeakWriteKey = process.env.WRITE_KEY;

const port = process.env.PORT || 3001;

//import sendEmail from "./utils/sendMail.js";

// Express config
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Mongo Connection
const uri = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

mongoose
  .connect(uri, {
    serverApi: {
      version: "1",
      deprecationErrors: true,
    },
  })
  .then(() => {
    console.log("connected to dB");
  })
  .catch((err) => {
    console.error(err);
  });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const devOrigin = "http://localhost:3001";

const prodOrigin = process.env.PROD_ORIGIN;

// Routes
const options = {
  origin: process.env.NODE_ENV === "development" ? devOrigin : prodOrigin,
  credentials: true,
  exposedHeaders: ["Authorization"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(options));

import User from "./models/User.js";
import Tank from "./models/Tank.js";
import History from "./models/History.js";

// Passport config
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pump status
let pumpState = 0;

// socket.io connection
io.on("connection", (socket) => {
  let waterLevel = 0;
  let temp = 0;
  let turbidity = 0;

  const fetchThingSpeakData = async () => {
    try {
      const response = await fetch(
        `https://api.thingspeak.com/channels/${thingSpeakChannel}/feeds.json?api_key=${thingSpeakReadKey}&results=1`,
        { method: "GET" }
      );

      const responseData = await response.json();

      waterLevel = parseInt(responseData.feeds[0].field1);
      temp = parseInt(responseData.feeds[0].field2);
      turbidity = parseInt(responseData.feeds[0].field3);
      pumpStatus = parseInt(responseData.feeds[0].field4);

      pumpState = pumpStatus;

      const data = {
        waterLevel,
        temp,
        turbidity,
        pumpStatus,
      };
      socket.emit("sensorData", data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchThingSpeakData();

  const intervalId = setInterval(fetchThingSpeakData, 9000);

  // Handle recalibrate event
  socket.on("reset", () => {
    temp = 0;
    heart = 0;
    console.log("Sensors recalibrated");
    const data = {
      temp,
      heart,
    };
    socket.emit("sensorData", data);
    fetchThingSpeakData();
  });

  // Handle stop monitoring event
  socket.on("togglePump", () => {
    pumpState = !pumpState;
    const url = `https://api.thingspeak.com/update?api_key=${thingSpeakWriteKey}&field5=${pumpState}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to write data to ThingSpeak");
        }
        console.log("Trigger sent");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    clearInterval(intervalId);
  });
});

//import routes
import userRouter from "./routes/user-routes.js";
import tankRouter from "./routes/tank-routes.js";
import historyRouter from "./routes/history-routes.js";
import notificationRouter from "./routes/notification-routes.js";

app.use("/users", userRouter);
app.use("/tanks", tankRouter);
app.use("/history", historyRouter);
app.use("/notification", notificationRouter);

app.use("/", (req, res, next) => {
  res.send("This is waterwatch");
});

/*Share sensor data to email
app.post("/share-data/:id", verifyToken, async (req, res) => {
  const { recipientmail, recipientname, checked } = req.body;

  const patientId = req.params.id;

  const patient = await Patient.findOne({ _id: patientId });

  let recipients = [];

  if (!patient) {
    return res.status(201).json("No patient with that ID exists.");
  }
  recipients.push(recipientmail);

  if (checked === true) {
    recipients.push(patient.email);
  }

  const mailOptions = {
    user: process.env.MY_EMAIL,
    password: process.env.MY_PASSWORD,
    from: process.env.MY_EMAIL,
    to: recipients, // Pass the array of recipients
    subject: `${patient.firstName}'s health data.`,
    text: `Hi,
      We monitored ${patient.firstName}'s health and here is the result for their temperature and heart rate:
      Temperature Value: ${patient.temperatureValue}
      Heart Rate: ${patient.heartRate}`,
  };

  try {
    await sendEmail(mailOptions);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});
*/
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
