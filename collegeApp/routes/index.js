const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController.js')
const {authenticate} = require('../middlewares/authMiddleware.js')

router.post('/register',AuthController.index)
router.post('/login',AuthController.login)
router.use(authenticate)
module.exports = router
