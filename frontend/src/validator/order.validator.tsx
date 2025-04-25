import Joi from 'joi';

const orderValidator = Joi.object({
  name: Joi.string().max(35).messages({
    "string.max": "max is 300 allowed",
    "string.pattern.base": "Будь ласка, введіть дійсну електронну адресу"
  })
})