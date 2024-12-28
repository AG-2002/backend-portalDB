const {HttpError} = require('http-errors');

module.exports = (err, req,res,next) => {
    if(err instanceof HttpError){
        res.status(err.status).send({name:err.name, message: err.message});
    }

    if(err.code === 401){
        res.send(err);
    }

    res.send("Unknown Error");
    next();
}