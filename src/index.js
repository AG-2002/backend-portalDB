require("express-async-errors");
require("dotenv").config();

const express = require("express");
const winston = require("winston");
const cors = require("cors");

require("./database/db.js");
require("winston-mongodb");
const adminRoute = require("./routes/adminRoute.js");
const employeeRoute = require("./routes/employeeRoute.js");
const error = require("./middleware/error.js");

const app = express();

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

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/admin", adminRoute);
app.use("/api/employee", employeeRoute);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log("listening at 8080");
});

module.exports = app;
