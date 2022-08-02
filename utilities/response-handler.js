function successHandler(res,message,data){
        res.status(200)
        res.json({
             success : true,
             "message": message,
             "data": data,
         })
}

function errorHandler(err, req, res, next) {
    res.status(500)
    res.send({
        success : false,
        message: err.message,
     })
  }

module.exports={successHandler, errorHandler}