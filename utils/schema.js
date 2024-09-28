const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().min(3).max(50).required(),
        image : {
            url : Joi.string().allow("",null) 
        },
        description : Joi.string().min(8).max(189),
        price : Joi.number().min(1).required(),
        location : Joi.string().min(3).max(20).required(),
        country : Joi.string().min(3).max(20).required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating  : Joi.number().min(1).max(5).required(),
        comment : Joi.string().min(3).required()
    }).required()
});
