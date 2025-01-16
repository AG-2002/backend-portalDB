const { HttpError } = require("http-errors");
const winston = require("winston");

module.exports = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .send({ name: err.name, message: err.message });
  }

  if (err.code === 401) {
    winston.error(`Unauthorized access: ${err.message}`, err);
    return res.send(err);
  }

  winston.error(err.message, err);
  
  return res.status(501).send('Something failed on the server. Please try again later.');
};
