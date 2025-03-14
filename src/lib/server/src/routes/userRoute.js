const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')
const validate = require('../middlewares/validate.middleware')
const userValidation = require('../validators/userValidations')

router.route("/user")
.post( validate(userValidation.createUser),userController.createUser )
.get( userController.getAllUsers )

router.route('/user/:id')
.get( userController.getUserById )
.put( validate( userValidation.updateUser ), userController.updateUserById )
.delete( userController.deleteUserById )


module.exports = router