async function successResponse(req,message,rows,data){
    const payload = {
        "link": req.protocol + '://' + req.get('host') + req.originalUrl,
        "method" :req.method,
        "success" : true,
        "rows": rows,
        "message":message,
    }
    return payload
}

async function errorResponse(req,message,data){
    const payload = {
        "link": req.protocol + '://' + req.get('host') + req.originalUrl,
        "method" :req.method,
        "success" : false,
        "rows": [],
        "message":message,
        "inputData": data
    }
    return payload
}

module.exports={successResponse:successResponse,errorResponse:errorResponse}