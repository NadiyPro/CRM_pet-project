import Joi from 'joi';

const createMessageValidator = Joi.object({
  messages: Joi.string().min(5).max(200).messages({
    "string.min": "min is 5",
    "string.max": "max is 200"
  })
})

export default createMessageValidator;