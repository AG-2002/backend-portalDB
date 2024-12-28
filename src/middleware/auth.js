const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const Admin = require("../models/adminSchema");

async function auth(req, res, next) {
  const token = req.header("Cookie").replace("token=", "");
  const { id } = jwt.decode(token);
  if (!id) throw Unauthorized("Unauthorized");

  const admin = await Admin.findById(id);

  if (!admin) throw Unauthorized("Unauthorized");

  req.admin = admin;
  next();
}

module.exports = auth;
