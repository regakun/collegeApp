const { Users, Mahasiswas, Dosens } = require('../models')
const {  verify } = require('../helpers/passwordHelper.js')
const { sign } = require('../helpers/jwtHelper.js')

class authController {
    static index(request, response, next) {
        let registerData = {
            email: request.body.email,
            password: request.body.password,
            role: request.body.role
        }
        if (registerData.role != 'mahasiswa' && registerData.role != 'dosen') {
            next({code: 400, msg: 'Role is invalid!'})
        }else {
            Users.create(registerData)
                .then (data => {
                    if (registerData.role == 'dosen') {
                        return Dosens.create({
                            userId: data.id,
                            nama: request.body.nama
                        })
                    }else{
                        return Mahasiswas.create({
                            userId: data.id,
                            nama: request.body.nama,
                            alamat: request.body.alamat,
                            tanggal_lahir: request.body.tanggal_lahir,
                            jurusan: request.body.jurusan
                        })
                    }
                })
                .then(data => {
                    let userdata = {
                        id: data.id,
                        nama: data.nama,
                        userId: data.userId
                    }
                    response.status(201).json({success: true, message: "user created", Data: userdata})
                })
                .catch (err => {
                    next(err)
                })
        }
    }
    static login(request, response, next) {
        let formData = {
            email: request.body.email,
            password: request.body.password
        }
        Users.findOne({
            where: {
                email: formData.email
            }
        })
            .then(data => {
                if (data) {
                    if (verify(formData.password, data.password)){
                        let returnData = {
                            id: data.id,
                            email: data.email
                        }
                        returnData.access_token = sign(returnData)
                        response.status(200).json({success:true,data: returnData})
                    }else{
                        next({code: 400, msg: 'email or Password is wrong'})
                    }
                }else{
                    next({code: 400, msg: 'email or Password is wrong'})
                }
            })
    }
}

module.exports = authController