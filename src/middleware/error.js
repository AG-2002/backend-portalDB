const { HttpError } = require("http-errors");

module.exports = (err, req, res, next) => {
  if (err instanceof HttpError) {
   return res.status(err.status).send({ name: err.name, message: err.message });
  }

  if (err.code === 401) {
    return res.send(err);
  }

  console.log(err);
  return res.status(501).send("Somthing went wrong in server");
};
