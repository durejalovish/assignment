const Joi = require('@hapi/joi');   

const registerValidation = (data) => {
    const UserValidationSchema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(4).email().required(),
        phoneNumber:Joi.string().required().length(10) ,
        password:Joi.string().min(4).required()
    })
    return UserValidationSchema.validate(data);
}

const loginValidation = (data) => {
    const UserLoginValidationSchema = Joi.object({
        email:Joi.string().min(4).email().required(),
        password : Joi.string().min(4).required(),
    })
    return UserLoginValidationSchema.validate(data);
}

const addTire = (data) => {
    const addTireSchema = Joi.object({
        brandName: Joi.string().min(2).optional(),
        quantity: Joi.number().min(0).required(),
        size: Joi.string().min(2).required(),
        pattern: Joi.string().min(2).required(),
        price:  Joi.number().min(0).required(),
    })
    return addTireSchema.validate(data);
}

const addBrand = (data) => {
    const addBrandSchema = Joi.object({
        brandName: Joi.string().min(2).required(),
        description: Joi.optional()
    })
    return addBrandSchema.validate(data);
}
const updateTire = (data) => {
    const addTireSchema = Joi.object({
        size: Joi.string().min(2).required(),
    })
    return addTireSchema.validate(data);
} 
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addTire = addTire;
module.exports.updateTire = updateTire;
module.exports.addBrand = addBrand;

