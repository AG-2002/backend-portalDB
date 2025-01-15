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

const allowlist = [process.env.FRONTEND_PROD_URL, process.env.FRONTEND_DEV_URL];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  const origin = req.header("Origin");
  if (allowlist.includes(origin) || !origin) {
    corsOptions = {
      origin: origin,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
      credentials: true,
    };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);
process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(new winston.transports.MongoDB({ db: process.env.DB_URL }));

app.use(express.json());
app.use(cors(corsOptionsDelegate));

app.use("/api/admin", adminRoute);
app.use("/api/employee", employeeRoute);

app.get("/", (req, res) => res.send("Home"));

app.use(error);

app.listen(process.env.PORT, () => {
  console.log("listening at 8080");
});

module.exports = app;
