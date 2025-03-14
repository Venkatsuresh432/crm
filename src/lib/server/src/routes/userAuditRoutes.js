const express = require('express')
const router = express.Router()
const userAuditController = require('../controllers/userAuditController')
const validate = require('../middlewares/validate.middleware')
// const userValidation = require('../validators/userValidations')

router.route("/useraudit")
.post( validate, userAuditController.createUserAudit )
.get( userAuditController.getAllUserAudit )

router.route('/useraudit/:id')
.get( userAuditController.getUserAuditById )
.put( validate, userAuditController.updateUserAudit )
.delete( userAuditController.deleteUserAudit )


module.exports = router