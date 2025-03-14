const express = require('express')
const router = express.Router()
const pageBlogController = require('../controllers/pageBlogController')
const validate = require('../middlewares/validate.middleware')
// const userValidation = require('../validators/userValidations')

router.route("/pageblog")
.post( validate, pageBlogController.createPageBlogCategory )
.get( pageBlogController.getAllPageBlogCategory )

router.route('/pageblog/:id')
.get( pageBlogController.getPageBlogCategoryById )
.put( validate, pageBlogController.updatePageBlogCategory )
.delete( pageBlogController.deletePageBlogsCategory )


module.exports = router