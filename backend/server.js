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

// socket.io connection
io.on("connection", (socket) => {
  let waterLevel = 0;
  let temp = 0;
  let turbidity = 0;
  let leakage = false;
  let pumpState = false;
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
      waterLevel = Math.floor(Math.random() * 26);
      temp = Math.floor(Math.random() * 41);
      turbidity = Math.floor(Math.random() * 11);
      const data = {
        waterLevel,
        temp,
        turbidity,
        pumpState,
        leakage,
      };
      //console.log(data);

      socket.emit("tankData", data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchThingSpeakData();

  const intervalId = setInterval(fetchThingSpeakData, 9000);

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

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
