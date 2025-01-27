const { getAdmin, createAdmin } = require("../services/adminService.js");

exports.createAdmin = async (req, res) => {
  const data = req.body;
 const response = await createAdmin(data);
 if(response){
  res.status(201).send("created sucessfully");
 }
};

exports.loginAdmin = async (req, res) => {
  const data = req.body;
  const admin = await getAdmin(data);

  const token = admin.generateToken();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(204).send();
};

exports.getAdminInfo = async (req, res) => {
  const adminData = req.admin;
  res.status(200).send(adminData);
};

exports.logout = async (req, res) => {
  const token = req.header("Cookie")?.replace("token=", "");
  res.clearCookie('token', {
    httpOnly: true, 
    secure: true,  
    sameSite: 'none',
  });
  res.status(204).send();
};
