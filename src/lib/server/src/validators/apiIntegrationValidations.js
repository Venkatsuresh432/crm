const Joi = require('joi');


const uuidValidation = Joi.string().trim().guid({ version: ['uuidv1'] })
                        .messages({
                            'string.guid': 'Invalid UUID format'
                        });

const urlValidation = Joi.string().trim().uri().required()
                        .messages({
                            'string.uri': 'Invalid URL format',
                            'any.required': 'Endpoint URL is required'
                        });

exports.createApiIntegrationSchema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required()
        .messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name cannot exceed 255 characters',
            'any.required': 'Name is required'
        }),
    endpoint_url: urlValidation,
    method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').required()
            .messages({
                'any.only': 'Method must be one of [GET, POST, PUT, DELETE]',
                'any.required': 'Method is required'
            }),

    headers: Joi.object().optional()
            .messages({
                'object.base': 'Headers must be a valid JSON object'
            }),

    body: Joi.object().optional()
            .messages({
                'object.base': 'Body must be a valid JSON object'
            }),

    authentication: Joi.object().optional()
                    .messages({
                        'object.base': 'Authentication must be a valid JSON object'
                    }),
    created_by: uuidValidation.optional()
});


exports.updateApiIntegrationSchema = Joi.object({
    name: Joi.string().trim().min(3).max(255).optional()
        .messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name cannot exceed 255 characters'
        }),
    endpoint_url: urlValidation.optional(),
    method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').optional()
            .messages({
                'any.only': 'Method must be one of [GET, POST, PUT, DELETE]'
            }),

    headers: Joi.object().optional()
            .messages({
                'object.base': 'Headers must be a valid JSON object'
            }),

    body: Joi.object().optional()
            .messages({
                'object.base': 'Body must be a valid JSON object'
            }),

    authentication: Joi.object().optional()
        .messages({
            'object.base': 'Authentication must be a valid JSON object'
        }),
    created_by: uuidValidation.optional()
});


