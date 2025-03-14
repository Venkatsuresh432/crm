const Joi = require('joi');

const uuidValidation = Joi.string()
    .trim()
    .guid({ version: ['uuidv1'] })
    .messages({
        'string.guid': 'Invalid UUID format'
    });


exports.createNotificationSchema = Joi.object({
    user_id: uuidValidation.optional(),

    message: Joi.string().trim().min(5).max(1000).required()
            .messages({
                'string.empty': 'Message cannot be empty',
                'string.min': 'Message must be at least 5 characters long',
                'string.max': 'Message cannot exceed 1000 characters',
                'any.required': 'Message is required'
            }),

    type: Joi.string().trim().max(50).optional()
            .messages({
                'string.max': 'Type cannot exceed 50 characters'
            }),

    is_read: Joi.boolean().default(false)
            .messages({
                'boolean.base': 'is_read must be a boolean value'
            })
});


exports.updateNotificationSchema = Joi.object({
    message: Joi.string().trim().min(5).max(1000).optional()
        .messages({
            'string.empty': 'Message cannot be empty',
            'string.min': 'Message must be at least 5 characters long',
            'string.max': 'Message cannot exceed 1000 characters'
        }),

    type: Joi.string().trim().max(50).optional()
            .messages({
                'string.max': 'Type cannot exceed 50 characters'
            }),

    is_read: Joi.boolean().optional()
            .messages({
                'boolean.base': 'is_read must be a boolean value'
            })
});


