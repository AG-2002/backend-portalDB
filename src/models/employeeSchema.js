const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    designation: {
      type: String,
      required: true,
      enum: ["HR", "Manager", "Sales", "Other"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
