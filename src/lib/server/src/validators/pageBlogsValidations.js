const joi = require('joi')

const uuidValidation = joi.string().trim().guid({version: ['uuidv4', 'uuidv5']})
                        .messages({
                            'string.guid': 'invalid uuid format'
                        })

exports.createPageBlogSchema = joi.object({
    category_id: uuidValidation.optional(),
    subcategory_id : uuidValidation.optional(),
    title: joi.string().trim().min(5).max(255).required()
            .messages({
                'string.empty': 'title cannot be empty',
                'string.min':'title must be atleast 5 charecters long',
                'string.max': 'titlecannot exceed 255 charecters'
            }),
    content: joi.string().trim().min(10).required()
            .messages({
                'string.empty': 'content must cannot be empty',
                'string.min': 'content must be atleast 10 charecters long',
                'any.required': "content is required"
            }),
    metadata: joi.object().optional().messages({ 'object.base' : 'metadata must be an valid json object'}),
    author_id: uuidValidation.optional(),
    is_published: joi.boolean().default(false).messages({ 'boolean.base': 'is_published is must be an boolean value'})                 
});


exports.updatePageBlogSchema = joi.object({
    category_id: uuidValidation.optional(),
    subcategory_id: uuidValidation.optional(),
    title: joi.string().trim().min(5).max(255).optional()
            .messages({
                'string.empty':'title must not be empty',
                'string.min': 'title must be atleast 5 charecter long',
                'string.max': 'title cannot be exceed 255 charecter'
            }),
    content: joi.string().trim().min(10).optional()
            .messages({ 
                'string.empty': 'content cannot be empty',
                'string.min': 'content must be atleast 10 charecters long'
            }),
    metadata: joi.object().optional().messages({ 'object.base':'meta data must be an json object'}),
    is_published: joi.boolean().optional().messages({ 'boolean.base': 'published must be an boolean value'})                
})