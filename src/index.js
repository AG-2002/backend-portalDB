require("express-async-errors");
require("dotenv").config();

const express = require("express");
const winston = require("winston");
const cors = require("cors");

require("./database/db.js");
require("winston-mongodb");
const error = require("./middleware/error.js");
const adminRoute = require("./routes/adminRoute.js");
const employeeRoute = require("./routes/employeeRoute.js");

const app = express();

const allowedOrigins = [process.env.FRONTEND_PROD_URL, process.env.FRONTEND_DEV_URL];

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.exceptions.handle(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.prettyPrint()
    ),
  }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);
process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(new winston.transports.MongoDB({ db: process.env.DB_URL }));

app.use(
  cors({
    origin: (origin, callback) => {
      // If `origin` is in the allowed list or is undefined (e.g., non-browser requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Set the origin dynamically
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/admin", adminRoute);
app.use("/api/employee", employeeRoute);

app.get("/", (req, res) => res.send("Home"));

app.use(error);

app.listen(process.env.PORT, () => {
  console.log("listening at 8080");
});

module.exports = app;
