const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationsController')
const validate = require('../middlewares/validate.middleware')
// const userValidation = require('../validators/userValidations')

router.route("/notification")
.post( validate, notificationController.createNotifications )
.get( notificationController.getAllNotifications )

router.route('/notification/:id')
.get( notificationController.getNotificationsById )
.put( validate, notificationController.updateNotifications )
.delete( notificationController.deleteNotifications )


module.exports = router