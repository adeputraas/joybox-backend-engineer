const Joi = require('joi');

exports.readBySubject = async (newBook) => {

    const schema = Joi.object({
        subject: Joi.string().required()
    }).required();

    try {
        const response = await schema.validateAsync(newBook);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.borrowBook = async (newBook) => {

    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        edition_number: Joi.string().required(),
        subject: Joi.string().required(),
        name: Joi.string().required(),
        pickup_schedule: Joi.date().iso().required()
    }).required();

    try {
        const response = await schema.validateAsync(newBook);
        return response;
    } catch (error) {
        throw error;
    }
};
