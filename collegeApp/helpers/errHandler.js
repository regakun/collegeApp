const errHandler = (err, request, response, next) => {
    console.log(err);
    if (err.name) {
        if (err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"  || err.name == "SequelizeDatabaseError") {
            try{
                let errors = []
                err.errors.forEach(element => {
                    errors.push(element.message)
                });
                response.status(400).json({errors})
            }
            catch(e) {
                response.status(400).json({err})
            }
        }else if(err.length > 0){
            response.status(400).json({errors: [err.errors[0].message]})
        }else{
            response.status(500).json({errors: [err]})
        }
    }else{
        if (err.msg) {
            response.status(err.code).json({errors: [err.msg]})
        }else{
        }
    }
}
module.exports = errHandler