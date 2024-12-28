const {getAdmin,createAdmin} = require("../services/adminService.js");

exports.createAdmin = async (req,res) => {
   const data = req.body;
   const result = createAdmin(data);
   res.send("created sucessfully",result);
}

exports.loginAdmin = async (req, res) => {
    const data = req.body;
   const admin = await getAdmin(data);
   const token = admin.generateToken();
   admin.token = token;
   await admin.save();
   res.cookie("token",token,{httpOnly:true});
   res.send(admin);
    
}

