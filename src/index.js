require("express-async-errors");
require("dotenv").config();
require("./database/db.js");
const cors = require("cors");
const express = require("express");
const app = express();

const error = require("./middleware/error.js");

const adminRoute = require("./routes/adminRoute.js");

const employeeRoute = require("./routes/employeeRoute.js");

app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use("/api/admin", adminRoute);

app.use("/api/employee", employeeRoute);

app.use(error);

app.get("/",(rq,res)=>res.send("Express on Vercel"));

app.listen(process.env.PORT, () => {
  console.log("listening at 8080");
});

module.exports = app;
