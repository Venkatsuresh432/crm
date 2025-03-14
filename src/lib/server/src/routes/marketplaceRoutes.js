const express = require('express')
const router = express.Router()
const marketplaceController = require('../controllers/marketplaceController')
const validate = require('../middlewares/validate.middleware')
// const userValidation = require('../validators/userValidations')

router.route("/marketplace")
.post( validate, marketplaceController.createMarketplace )
.get( marketplaceController.getAllcreateMarketplace )

router.route('/marketplace/:id')
.get( marketplaceController.getMarketplaceById )
.put( validate, marketplaceController.updateMarketplace )
.delete( marketplaceController.deleteMarketplace )


module.exports = router