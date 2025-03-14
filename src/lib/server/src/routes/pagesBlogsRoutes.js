const express = require('express')
const router = express.Router()
const pageBlogController = require('../controllers/pageBlogController')
const validate = require('../middlewares/validate.middleware')
const pageBlogValidation = require('../validators/pageBlogsValidations')

router.route("/pageblog")
.post( validate(pageBlogValidation.createPageBlogSchema), pageBlogController.createPageBlogCategory )
.get( pageBlogController.getAllPageBlogCategory )

router.route('/pageblog/:id')
.get( pageBlogController.getPageBlogCategoryById )
.put( validate(pageBlogValidation.updatePageBlogSchema), pageBlogController.updatePageBlogCategory )
.delete( pageBlogController.deletePageBlogsCategory )


module.exports = router