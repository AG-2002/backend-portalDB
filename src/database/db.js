const mongoose = require('mongoose');

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/portalDB");
}

main()
  .then(() => {
    console.log("connection sucessfull");
  })
  .catch((err) => console.log(err));

  module.exports = main;

