const { Users, Mahasiswas, Dosens } = require('../models')
const { verifyToken } = require('../helpers/jwtHelper.js')

const authenticate = (request, response, next) => {
    if (request.headers.access_token) {
        let userData = verifyToken(request.headers.access_token)
        if (userData.id && userData.email) {
            Users.findOne({
                where: {
                    id: userData.id,
                    email: userData.email
                }
            })   
            .then(data => {
                request.userData = userData
                next()
            })
            .catch(err => {
                next(err)
            })
        }else{
            next({code:400, msg: 'Invalid Token'})
        }
    }else{
        next({code:400, msg: 'Invalid Token'})
    }
}

const authorizeNilai = (request, response, next) => {
    let userData 
    Users.findOne({
        where: {
            id: request.userData.id,
        }
    })
    .then(data => {
        if (data.role != 'dosen') {
            next({code:403, msg: 'Unauthorized'})
        }else{
            userData = data
            return Dosens.findOne({
                where: {
                    userId: data.id
                }
            })
        }
    })
    .then(data => {
        request.dosenData = data
        next()
    })
    .catch(err => {
        next(err)
    })
}


module.exports = {authenticate, authorizeNilai}
