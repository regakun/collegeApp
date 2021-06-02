const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController.js')
const Nilai = require('./nilai.js')

router.post('/register',AuthController.index)
router.post('/login',AuthController.login)
router.use('/nilai',Nilai)
module.exports = router
