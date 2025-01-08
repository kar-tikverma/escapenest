const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string()
            .required(),
        location: Joi.string()
            .required(),
        country: Joi.string()
            .required(),
        price: Joi.number()
            .required()
            .min(0),
    }).required()
        .unknown(true)
}).required();

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
            .required()
            .min(1)
            .max(5),
        comment: Joi.string()
            .allow(""),
    }).required()
        .unknown(true)
}).required();