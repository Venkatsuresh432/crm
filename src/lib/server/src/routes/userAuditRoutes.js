const express = require('express')
const router = express.Router()
const userAuditController = require('../controllers/userAuditController')
const validate = require('../middlewares/validate.middleware')
const userAuditValidation = require('../validators/userAuditValidations')

router.route("/useraudit")
.post( validate(userAuditValidation.craeteUserAuditSchema), userAuditController.createUserAudit )
.get( userAuditController.getAllUserAudit )

router.route('/useraudit/:id')
.get( userAuditController.getUserAuditById )
.put( validate(userAuditValidation.updateUserAuditSchema), userAuditController.updateUserAudit)
.delete( userAuditController.deleteUserAudit )


module.exports = router