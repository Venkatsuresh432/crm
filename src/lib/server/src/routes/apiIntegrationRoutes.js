const express = require('express')
const router = express.Router()
const apiIntegrationController = require('../controllers/apiIntegrationsController')
const validate = require('../middlewares/validate.middleware')
// const userValidation = require('../validators/userValidations')

router.route("/apiintegration")
.post( validate, apiIntegrationController.createApiInetgration )
.get( apiIntegrationController.getAllApiInetgration )

router.route('/apiintegration/:id')
.get( apiIntegrationController.getApiInetgrationById )
.put( validate, apiIntegrationController.updateApiInetgration )
.delete( apiIntegrationController.deleteApiInetgration )


module.exports = router