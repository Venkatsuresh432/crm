const joi = require('joi')

exports.craeteBlogCategorySchema = joi.object({
    category_name : joi.string().trim().min(3).max(255).required()
                    .messages({
                        'string.base':'category name must be an string',
                        'string.empty':'category name cannot be empty',
                        'string.min':'category name must be atleast 3 chareceter long',
                        'string.max':'category name cannot exceed 255 charecter',
                        'any.required':'category name is required'
                    })
});

exports.updateblogCategorySchema = joi.object({
    category_name : joi.string().trim().min(3).max(255).optional()
                    .messages({
                        'string.base':'category name must be an string',
                        'string.empty':'category name cannot be empty',
                        'string.min':'category name must be atleast 3 chareceter long',
                        'string.max':'category name cannot exceed 255 charecter', 
                    })
})