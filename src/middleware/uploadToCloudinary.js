const sharp = require("sharp");
const handleUpload = require("../config/cloudinary-config");

async function uploadToCloudinary(req, res, next) {
  if (!req.file)  return next();

  // Resize image using sharp
  const resizedBuffer = await sharp(req.file.buffer) // Input the raw buffer
    .resize({ width: 800 }) // Resize to a width of 800px (adjust as needed)
    .jpeg({ quality: 80 }) // Convert to JPEG and set quality (adjust format if needed)
    .toBuffer(); // Get the resized image as a buffer

  const b64 = Buffer.from(resizedBuffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  const cldRes = await handleUpload(dataURI);

  req.body.url = cldRes.secure_url;

  next();
}

module.exports = uploadToCloudinary;
