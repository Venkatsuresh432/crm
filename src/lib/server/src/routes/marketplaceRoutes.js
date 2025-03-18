    const express = require('express')
    const router = express.Router()
    const marketplaceController = require('../controllers/marketplaceController')
    const validate = require('../middlewares/validate.middleware')
    const marketplaceValidation = require('../validators/marketplaceValidations')
    const admin = require('../middlewares/authMiddleware')
    
    router.use(admin)
    router.route("/marketplace")
    .post( validate(marketplaceValidation.createMarketPlaceSchema), marketplaceController.createMarketplace )
    .get( marketplaceController.getAllMarketplace )

    router.route('/marketplace/:id')
    .get( marketplaceController.getMarketplaceById )
    .put( validate(marketplaceValidation.updateMarketPlaceSchema), marketplaceController.updateMarketplace )
    .delete( marketplaceController.deleteMarketplace )


    module.exports = router