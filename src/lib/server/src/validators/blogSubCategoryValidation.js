const joi = require('joi')

exports.createBlogSubCategorySchema = joi.object({
    blog_category_id: joi.string().trim().guid({version:['uuidv1']}).required()
                        .messages({
                            'string.empty':'blog category id cannot be empty',
                            'string.guid': 'invalid blog category id format',
                            'any.required':'blog category is required'
                        }),
    sub_category_name: joi.string().trim().min(3).max(255).required()
                            .messages({
                                'string.base': 'sub-category name must be an string',
                                "string.min":"sub-category name must be an atleast 3 charecters long",
                                'string.empty': 'sub-category cannot be empty',
                                'string.max': 'sub-category name cannot exceed 255 charecters',
                                'any.required': 'sub-category is required'
                            })                    
})

exports.updateblogSubCategorySchema = joi.object({
    blog_category_id : joi.string().trim().guid({version: ['uuidv1']} ).optional()
                        .messages({
                            'string.guid': 'invalid blog id format'
                        }),
    sub_category_name:  joi.string().trim().min(3).max(255).optional()
                        .messages({
                            'string.base': 'sub-category name must be an string',
                                "string.min":"sub-category name must be an atleast 3 charecters long",
                                'string.empty': 'sub-category cannot be empty',
                                'string.max': 'sub-category name cannot exceed 255 charecters',
                        })
})