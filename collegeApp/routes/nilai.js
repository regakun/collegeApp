const express = require('express')
const {authenticate, authorizeNilai} = require('../middlewares/authMiddleware.js')
const Controller = require('../controllers/nilaiController.js')
const router = express.Router()


router.use(authenticate)
router.get('/', Controller.index)
router.get('/average', Controller.average)
// router.get('/:id', authorize, Controller.detail)
router.post('/', authorizeNilai, Controller.create)
router.put('/:id', authorizeNilai, Controller.update)
router.delete('/:id', authorizeNilai, Controller.delete)


module.exports = router
