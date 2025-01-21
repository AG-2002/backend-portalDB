const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  createAdmin,
  getAdminInfo,
} = require("../controllers/adminController.js");
const hashPassword = require('../middleware/hashPassword.js');
const auth = require("../middleware/auth.js");

router.post("/signup", hashPassword,createAdmin);
router.post("/login", loginAdmin);
router.get("/profile",auth,getAdminInfo);
router.post('/logout',logout)

module.exports = router;

