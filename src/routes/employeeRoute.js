const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const {addEmployee,getAllEmployees,updateEmployee,deleteEmployee} = require('../controllers/employeeController');

router.post("/create",upload.single('image'),uploadToCloudinary,addEmployee);
router.get('/listing', getAllEmployees);
router.put('/:id',upload.single('image'),uploadToCloudinary, updateEmployee);
router.delete('/:id',deleteEmployee)

module.exports = router;