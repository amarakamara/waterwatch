import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import passport from "passport";
import cors from "cors";

// Import MQTT functions and uncomment them
import { publishData, subscribeToTopic } from "./mqttClient.js";

// Models
import User from "./models/User.js";
import Tank from "./models/Tank.js";
import History from "./models/History.js";
import Notification from "./models/Notification.js";
import Usage from "./models/Usage.js";

const port = process.env.PORT || 3001;

// Express config
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// MongoDB connection
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
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const devOrigin = "http://localhost:3001";
const prodOrigin = "https://waterwatch-flame.vercel.app";

const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? devOrigin : prodOrigin,
  credentials: true,
  exposedHeaders: ["Authorization"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  let waterLevel = 0;
  let temp = 0;
  let turbidity = 0;
  let leakage = false;
  let pumpState = false;
  let offlineTimeout;

  // Function to set random values - commented out
  /*
  const generateRandomValues = () => {
    waterLevel = Math.floor(Math.random() * 101);
    temp = Math.floor(Math.random() * 35) + 10;
    turbidity = Math.floor(Math.random() * 100);
    leakage = Math.random() < 0.2;
    pumpState = Math.random() < 0.5;

    const data = {
      waterLevel,
      temp,
      turbidity,
      pumpState,
      leakage,
      sysState: "online",
    };

    socket.emit("tankData", data);
    console.log("Sent random data to client:", data);
  };
  */

  // Periodically send random data - commented out
  // const randomDataInterval = setInterval(generateRandomValues, 5000); // Send data every 5 seconds

  // Handle toggling the pump state
  socket.on("togglePump", () => {
    pumpState = !pumpState;
    const state = pumpState ? 1 : 0;
    console.log("Pump state toggled:", state);
    // Uncommented MQTT publish functionality
    publishData("waterwatch/pumpstate", JSON.stringify({ state }));
    socket.emit("pumpStateChanged", pumpState);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // clearInterval(randomDataInterval); // Commented out as randomDataInterval is no longer used
  });
});

// Import and use routes
import userRouter from "./routes/user-routes.js";
import tankRouter from "./routes/tank-routes.js";
import historyRouter from "./routes/history-routes.js";
import notificationRouter from "./routes/notification-routes.js";
import usageRouter from "./routes/usage-routes.js";
import passwordRouter from "./routes/password-routes.js";

app.use("/users", userRouter);
app.use("/tanks", tankRouter);
app.use("/history", historyRouter);
app.use("/notification", notificationRouter);
app.use("/usage", usageRouter);
app.use("/password", passwordRouter);

app.use("/", (req, res) => {
  res.send("This is WaterWatch");
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
