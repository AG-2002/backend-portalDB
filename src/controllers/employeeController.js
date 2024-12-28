const {
  createEmployee,
  fetchAllEmployees,
  updateEmployee,
  removeEmployee
} = require("../services/employeeService");

exports.addEmployee = async (req, res) => {
  const empData = req.body;
  if (!empData) {
    return res.status(400).send({ error: "No file uploaded" });
  }
  const result = await createEmployee(empData);
  console.log(result);
  res.status(201).send({ message: "employee add successfully" });
};

exports.getAllEmployees = async (req, res) => {
  const employeeList = await fetchAllEmployees(req.body);
  res.status(200).send({ message: "data fetch successfully", employeeList });
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
 const updatedEmployee = await updateEmployee({ id, updateData:req.body });
  res.status(200).send({ message: "updated successfully",updatedEmployee});
};

exports.deleteEmployee = async (req,res) => {
  const {id} = req.params;
  await removeEmployee(id);
  res.status(200).send({message:"Employee remove sucessfully"});
}
