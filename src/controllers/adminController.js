const { getAdmin, createAdmin } = require("../services/adminService.js");

exports.createAdmin = async (req, res) => {
  const data = req.body;
  await createAdmin(data);
  res.status(201).send("created sucessfully");
};

exports.loginAdmin = async (req, res) => {
  const data = req.body;
  const admin = await getAdmin(data);

  const token = admin.generateToken();

  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(204).send();
};

exports.getAdminInfo = async (req, res) => {
  const adminData = req.admin;
  console.log("yes");
  res.status(200).send(adminData);
};
