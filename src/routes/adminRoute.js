const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  createAdmin,
} = require("../controllers/adminController.js");
const hashPassword = require('../middleware/hashPassword.js');

router.post("/signup", hashPassword,createAdmin);
router.post("/login", loginAdmin);
module.exports = router;

