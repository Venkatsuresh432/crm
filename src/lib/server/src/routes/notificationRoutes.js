const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationsController')
const validate = require('../middlewares/validate.middleware')
const notificationValidation = require('../validators/notificationsValidations')

router.route("/notification")
.post( validate(notificationValidation.createNotificationSchema), notificationController.createNotifications )
.get( notificationController.getAllNotifications )

router.route('/notification/:id')
.get( notificationController.getNotificationsById )
.put( validate(notificationValidation.updateNotificationSchema), notificationController.updateNotifications )
.delete( notificationController.deleteNotifications )


module.exports = router