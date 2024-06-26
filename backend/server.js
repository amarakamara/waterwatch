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
import Notification from "./models/Notification.js";
import Usage from "./models/Usage.js";

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
  let leakage = false;
  let pumpState = true;
  const fetchThingSpeakData = async () => {
    try {
      /*
      const response = await fetch(
        `https://api.thingspeak.com/channels/${thingSpeakChannel}/feeds.json?api_key=${thingSpeakReadKey}&results=1`,
        { method: "GET" }
      );
      const responseData = await response.json();
      console.log(responseData);
  
      waterLevel = parseInt(responseData.feeds[0].field1);
      temp = parseInt(responseData.feeds[0].field2);
      turbidity = parseInt(responseData.feeds[0].field3);
      pumpStatus = parseInt(responseData.feeds[0].field4);
      leakageStatus = parseInt(responseData.feeds[0].field5);
      */

      // Generating random values for testing
      waterLevel = Math.floor(Math.random() * 26); // Random value between 0 and 25
      temp = Math.floor(Math.random() * 41); // Random value between 0 and 40 (assuming temperature in Celsius)
      turbidity = Math.floor(Math.random() * 101); // Random value between 0 and 100 (assuming turbidity percentage)
      //pumpState = Math.random() < 0.5 ? 0 : 1; // Random 0 or 1
      // leakageStatus = Math.random() < 0.5 ? 0 : 1; // Random 0 or 1

      /*if (leakageStatus === 1) {
        leakage = true;
      }

      if (pumpStatus === 1) {
        pumpState = true;
      }*/

      const data = {
        waterLevel,
        temp,
        turbidity,
        pumpState,
        leakage,
      };
      console.log(data);

      socket.emit("tankData", data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchThingSpeakData();

  const intervalId = setInterval(fetchThingSpeakData, 9000);

  // Handle togglePump event
  socket.emit("pumpStateChanged", pumpState);
  socket.on("togglePump", () => {
    pumpState = !pumpState;
    socket.emit("pumpStateChanged", pumpState);
    /*const url = `https://api.thingspeak.com/update?api_key=${thingSpeakWriteKey}&field4=${pumpState}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to write data to ThingSpeak");
        }
        console.log("Trigger sent");
      })
      .catch((error) => {
        console.error("Error:", error);
      });*/
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
import usageRouter from "./routes/usage-routes.js";

app.use("/users", userRouter);
app.use("/tanks", tankRouter);
app.use("/history", historyRouter);
app.use("/notification", notificationRouter);
app.use("/usage", usageRouter);

app.use("/", (req, res, next) => {
  res.send("This is waterwatch");
});

/*  
const dummyData = [
{
"timestamp": "2024-06-25T04:44:39.694698",
"literUsed": 78
},
{
"timestamp": "2024-06-25T05:44:39.694698",
"literUsed": 18
},
{
"timestamp": "2024-06-25T06:44:39.694698",
"literUsed": 50
},
{
"timestamp": "2024-06-25T07:44:39.694698",
"literUsed": 31
},
{
"timestamp": "2024-06-25T08:44:39.694698",
"literUsed": 90
},
{
"timestamp": "2024-06-25T09:44:39.694698",
"literUsed": 25
},
{
"timestamp": "2024-06-25T10:44:39.694698",
"literUsed": 10
},
{
"timestamp": "2024-06-25T11:44:39.694698",
"literUsed": 42
},
{
"timestamp": "2024-06-25T12:44:39.694698",
"literUsed": 65
},
{
"timestamp": "2024-06-25T13:44:39.694698",
"literUsed": 88
},
{
"timestamp": "2024-06-25T14:44:39.694698",
"literUsed": 13
},
{
"timestamp": "2024-06-25T15:44:39.694698",
"literUsed": 29
},
{
"timestamp": "2024-06-25T16:44:39.694698",
"literUsed": 95
},
{
"timestamp": "2024-06-25T17:44:39.694698",
"literUsed": 72
},
{
"timestamp": "2024-06-25T18:44:39.694698",
"literUsed": 12
},
{
"timestamp": "2024-06-25T19:44:39.694698",
"literUsed": 67
},
{
"timestamp": "2024-06-25T20:44:39.694698",
"literUsed": 48
},
{
"timestamp": "2024-06-25T21:44:39.694698",
"literUsed": 82
},
{
"timestamp": "2024-06-25T22:44:39.694698",
"literUsed": 5
},
{
"timestamp": "2024-06-25T23:44:39.694698",
"literUsed": 37
},
{
"timestamp": "2024-06-26T00:44:39.694698",
"literUsed": 19
},
{
    "timestamp": "2024-06-26T01:44:39.694698",
    "literUsed": 61
  },
  {
    "timestamp": "2024-06-26T02:44:39.694698",
    "literUsed": 99
  },
  {
    "timestamp": "2024-06-26T03:44:39.694698",
    "literUsed": 40
  },
  {
    "timestamp": "2024-06-26T04:44:39.694698",
    "literUsed": 23
  },
  {
    "timestamp": "2024-06-26T05:44:39.694698",
    "literUsed": 84
  },
  {
    "timestamp": "2024-06-26T06:44:39.694698",
    "literUsed": 15
  },
  {
    "timestamp": "2024-06-26T07:44:39.694698",
    "literUsed": 75
  },
  {
    "timestamp": "2024-06-26T08:44:39.694698",
    "literUsed": 5
  },
  {
    "timestamp": "2024-06-26T09:44:39.694698",
    "literUsed": 34
  },
  {
    "timestamp": "2024-06-26T10:44:39.694698",
    "literUsed": 11
  },
];

(async () => {
  try {
    for (const data of dummyData) {
      const newHistory = new History(data);
      await newHistory.save();
    }

    console.log("Dummy data saved to history successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
})();

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
