const {Admin}  = require("../models/adminSchema.js");

exports.createAdmin = async (data) => {
  const admin = new Admin(data);
  await admin.save();
 return admin;
}

exports.getAdmin = async ({username,password}) => {
  const admin =  await Admin.findByCredential({username,password});
  return admin;
};
