require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
         type: String,
         required: true
    }
});

adminSchema.statics.findByCredential = async function ({username,password}) {
    const admin = await Admin.findOne({username});
    if(!admin) throw Unauthorized("username & password are invalid");

    const isValid = await bcrypt.compare(password,admin.password);
    if(!isValid) throw Unauthorized("username & password are invalid");

    return admin;
    
}

adminSchema.methods.generateToken = function () {
  const token = jwt.sign({id:this._id}, process.env.JWT_KEY);
  return token;
}

const Admin = mongoose.model("Admin", adminSchema);
module.exports = {Admin};