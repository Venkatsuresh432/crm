const joi = require('joi')

const uuidValidation = joi.string().trim().guid({version: ['uuidv1']})
.messages({
    'string.guid': 'invalid uuid format'
})

exports.createPageBlogSchema = joi.object({
    category_id: uuidValidation.optional(),
    subcategory_id: uuidValidation.optional(),
    title: joi.string().trim().min(5).max(255).required()
        .messages({
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title must be at least 5 characters long',
            'string.max': 'Title cannot exceed 255 characters'
        }),
    content: joi.string().trim().min(10).required()
        .messages({
            'string.empty': 'Content cannot be empty',
            'string.min': 'Content must be at least 10 characters long'
        }),
    metadata: joi.object().optional().messages({ 'object.base': 'Metadata must be a valid JSON object' }),
    author_id: uuidValidation.optional(),
    is_published: joi.boolean().default(false).messages({ 'boolean.base': 'is_published must be a boolean value' })                 
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