const joi = require('joi')

exports.craeteUserAuditSchema = joi.object({
    user_id: joi.string().trim().guid({version: ['uuidv1']}).required()
            .messages({
                'string.empty':'user id cannot be empty',
                'string.guid': 'invalid uuid format',
                'any.required': 'user id is required'
            }),
    action_message: joi.string().trim().min(5).max(1000).required()
                    .messages({
                        'string.base': 'action message must be an string',
                        'string.empty': 'action message cannot be empty',
                        'string.min': 'action message must be atleast 5 charecters',
                        'string.max': 'action message cannot exceed 1000 charecters',
                        'any-required': "action message is required"
                    })        
});
exports.updateUserAuditSchema = joi.object({
    user_id : joi.string().trim().guid({ version:[ 'uuidv1' ] }).optional()
                .messages({
                    'string.guid':'invalid guid category id format'
                }),
    action_message: joi.string().trim().min(5).max(1000).optional()
                    .messages({
                        'string.base': 'action message must be an string',
                        'string.empty': 'action message cannot be empty',
                        'string.min': 'action message must be atleast 5 charecters',
                        'string.max': 'action message cannot exceed 1000 charecters',
                    })
})