import Joi from "joi";

export const AuthValidationSchema = Joi.object({
    email : Joi.string().required().email().messages({
        'string.email': 'Please enter a valid email',
        'string.empty' : 'Please enter an email address'
    }),
    password : Joi.string().required().messages({
        'string.empty': 'Please enter a password'
    })
})

