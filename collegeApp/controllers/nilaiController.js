const Model = require('../models').Nilais
const Sequelize = require('Sequelize')
const {Mahasiswas, Dosens, Mata_kuliah} = require('../models')

class nilaiController {
    static index(request, response, next){
        Model.findAll({
            attributes: ['nilai','keterangan','id','nim'],
            include: [
                {
                    model: Dosens,
                    attributes: ['id','nama']
                },
                {
                    model: Mahasiswas,
                    attributes: ['id','nama','jurusan','tanggal_lahir']
                },
                {
                    model: Mata_kuliah,
                    attributes: ['id','nama']
                }
            ]
        })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static average(request, response, next){
        let where = {}
        if (request.query.nim) {
            where.id = request.query.nim
        }else if (request.query.jurusan) {
            where.jurusan = request.query.jurusan
        }else {
            next({code: 400, msg: 'Invalid Query'})
        }
        Mahasiswas.findAll({
            attributes: ['id','nama','jurusan'],
            include: [
                {
                    model: Model,
                    attributes: ['nilai']
                }
            ],
            where: where
        })
            .then(data => {
                let nilai = 0
                let counter = 0
                data.forEach(element => {
                    element.Nilais.forEach(e => {
                        nilai += e.nilai
                        counter++
                    });
                });
                let average = nilai/counter
                console.log(nilai,'<nilai')
                console.log(counter,'<counter')
                let returnData = {
                    average_score: average
                }
                if (request.query.nim) {
                    returnData.nim = data[0].id,
                    returnData.nama = data[0].nama
                    returnData.jurusan = data[0].jurusan
                }else{
                    returnData.nama_jurusan = request.query.jurusan
                }
                if (counter<1) {
                    response.status(400).json({errors: [`Tidak ada Mahasiswa di Jurusan ${request.query.jurusan}`]})
                }else{
                    response.status(200).json(returnData)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static create(request, response, next){
        let data = {
            nim: request.body.nim,
            nidn: request.dosenData.id,
            matkul_id: request.body.matkul_id,
            nilai: request.body.nilai,
            keterangan: request.body.keterangan
        }
        Model.create(data)
            .then(data => {
                response.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static update(request, response, next){
        let data ={
            nim: request.body.nim,
            nidn: request.dosenData.id,
            matkul_id: request.body.matkul_id,
            nilai: request.body.nilai,
            keterangan: request.body.keterangan
        }
        Model.update(data,{
            where: {
                id: request.params.id
            },
            returning: true
        })
            .then(data => {
                if (data[0] === 1) {
                    response.status(200).json(data[1])
                }else{
                    next({code: 404, msg: 'data not found'})
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static delete(request, response, next){
        Model.destroy({
            where:{
                id: request.params.id
            }
        })
            .then(data => {
                response.status(200).json({message: 'item successfully deleted'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = nilaiController
