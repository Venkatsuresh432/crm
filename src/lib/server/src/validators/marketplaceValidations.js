
const Joi = require('joi');

const uuidValidation = Joi.string().trim().guid({ version: ['uuidv4', 'uuidv5'] })
                        .messages({
                            'string.guid': 'Invalid UUID format'
                        });


const urlValidation = Joi.string().trim().uri().optional()
                    .messages({
                        'string.uri': 'Invalid URL format'
                    });
exports.createMarketPlaceSchema = Joi.object({
    app_name: Joi.string().trim().min(3).max(255).required()
            .messages({
                'string.empty': 'App name cannot be empty',
                'string.min': 'App name must be at least 3 characters long',
                'string.max': 'App name cannot exceed 255 characters',
                'any.required': 'App name is required'
            }),
    description: Joi.string().trim().optional()
                .messages({
                    'string.base': 'Description must be a string'
                }),

    icon_url: urlValidation,
    app_type: Joi.string().valid('streamlit', 'native', 'others').required()
            .messages({
                'any.only': 'App type must be one of [streamlit, native, others]',
                'any.required': 'App type is required'
            }),
    iframe_url: urlValidation,
    security_groups_admin: Joi.array().items(Joi.string().trim()).optional()
        .messages({
            'array.base': 'Security groups (admin) must be an array of strings'
        }),
    security_groups_user: Joi.array().items(Joi.string().trim()).optional()
        .messages({
            'array.base': 'Security groups (user) must be an array of strings'
        }),
    created_by: uuidValidation.optional()
});

exports.updateMarketPlaceSchema = Joi.object({
    app_name: Joi.string().trim().min(3).max(255).optional()
                .messages({
                    'string.empty': 'App name cannot be empty',
                    'string.min': 'App name must be at least 3 characters long',
                    'string.max': 'App name cannot exceed 255 characters'
                }),
    description: Joi.string().trim().optional()
                .messages({
                    'string.base': 'Description must be a string'
                }),
    icon_url: urlValidation,
    app_type: Joi.string()
        .valid('streamlit', 'native', 'others')
        .optional()
        .messages({
            'any.only': 'App type must be one of [streamlit, native, others]'
        }),
    iframe_url: urlValidation,
    security_groups_admin: Joi.array().items(Joi.string().trim()).optional()
        .messages({
            'array.base': 'Security groups (admin) must be an array of strings'
        }),
    security_groups_user: Joi.array().items(Joi.string().trim()).optional()
        .messages({
            'array.base': 'Security groups (user) must be an array of strings'
        }),
    created_by: uuidValidation.optional()
});


