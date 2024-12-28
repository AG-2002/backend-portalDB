const Employee = require("../models/employeeSchema.js");

exports.createEmployee = async (employeeData) => {
  const newEmployee = new Employee(employeeData);
  await newEmployee.save();
  return newEmployee;
};

exports.fetchAllEmployees = async (filters = {}) => {
  return await Employee.find(filters);
};

exports.updateEmployee = async ({ id, updateData }) => {
  return await Employee.findByIdAndUpdate(id, updateData, {new:true} );
};

exports.removeEmployee = async (id) => {
  await Employee.findByIdAndDelete(id);
}


