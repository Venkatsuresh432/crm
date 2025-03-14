const joi = require("joi")

exports.createUser = joi.object({
    userName: joi.string().min(3).max(255).required(),
    email: joi.string().email().max(255).required(),
    password: joi.string().min(8).max(32)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"))
        .required()
        .messages({
            "string.pattern.base": "Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }),
        role: joi.string().valid('admin', 'user').default('user')
})


exports.updateUser = joi.object({
    userName: joi.string().min(3).max(255).required(),
    email: joi.string().email().max(255),
    password: joi.string().min(8).max(32)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"))
    .messages({
        "string.pattern.base": "Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    role: joi.string().valid('admin', 'user').default('user')
})