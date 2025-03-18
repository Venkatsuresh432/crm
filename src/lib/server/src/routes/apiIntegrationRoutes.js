    const express = require('express')
    const router = express.Router()
    const apiIntegrationController = require('../controllers/apiIntegrationsController')
    const validate = require('../middlewares/validate.middleware')
    const apiIntegrationValidation = require('../validators/apiIntegrationValidations')
    const admin = require('../middlewares/authMiddleware')
    
    router.use(admin)
    router.route("/apiintegration")
    .post( validate(apiIntegrationValidation.createApiIntegrationSchema), apiIntegrationController.createApiIntegration )
    .get( apiIntegrationController.getAllApiIntegration )

    router.route('/apiintegration/:id')
    .get( apiIntegrationController.getApiIntegrationById )
    .put( validate(apiIntegrationValidation.updateApiIntegrationSchema), apiIntegrationController.updateApiIntegration )
    .delete( apiIntegrationController.deleteApiIntegration )

    module.exports = router