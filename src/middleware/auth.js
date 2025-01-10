require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { Admin } = require("../models/adminSchema");

async function auth(req, res, next) {
  const token = req.header("Cookie")?.replace("token=", "");
  if(!token) throw Unauthorized();

  const { id } = jwt.verify(token, process.env.JWT_KEY);

  if (!id) throw Unauthorized();

  const admin = await Admin.findById(id);

  if (!admin) throw Unauthorized();
  req.admin = admin;
  next();
}

module.exports = auth;
