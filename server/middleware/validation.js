const joi = require('joi');
const { celebrate, Joi } = require('celebrate');

Joi.objectId = require('joi-objectid')(Joi);

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
});

const validateContact = (contactDetails) => {
  const schema = {
    name: joi.string().max(50).min(2).required(),
    phoneNumber: joi.number().min(1000000000).max(9999999999).required(),
  };

  return (joi.validate(contactDetails, schema));
};

const validateSms = (smsDetails) => {
  const schema = {
    recipientId: joi.string().required(),
    message: joi.string().max(255).min(2).required(),
    senderId: joi.string().required(),
  };

  return (joi.validate(smsDetails, schema));
};

module.exports = {
  validateId,
  validateContact,
  validateSms,
};
