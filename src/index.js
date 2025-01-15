require("express-async-errors");
require("dotenv").config();
require("./database/db.js");
require("winston-mongodb");

const winston = require("winston");
const cors = require("cors");
const express = require("express");
const app = express();

const allowlist = [process.env.FRONTEND_PROD_URL,process.env.FRONTEND_DEV_URL];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1 || !req.header('Origin')) {
    corsOptions = { 
      origin: req.header('Origin'),
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'], 
      credentials: true,
    }
  } else {
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions);
  
};


process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.exceptions.handle(
  new winston.transports.Console({colorize:true, prettyPrint:true}),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);
process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log"}));
winston.add(new winston.transports.MongoDB({ db: process.env.DB_URL }));

const error = require("./middleware/error.js");

const adminRoute = require("./routes/adminRoute.js");

const employeeRoute = require("./routes/employeeRoute.js");

app.use(express.json());

app.use(cors(corsOptionsDelegate));

app.use("/api/admin", adminRoute);

app.use("/api/employee", employeeRoute);

app.use(error);

app.get("/", (req, res) => res.send("Home"));

app.listen(process.env.PORT, () => {
  console.log("listening at 8080");
});

module.exports = app;
