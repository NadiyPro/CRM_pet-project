import Joi from 'joi';

const giveRoleValidator = Joi.object({
  name: Joi.string().min(3).max(25).messages({
    "string.min": "min is 3",
    "string.max": "max is 25"
  }),
  surname: Joi.string().min(3).max(25).messages({
    "string.min": "min is 3",
    "string.max": "max is 25"
  }),
  email: Joi.string().min(6).max(100).pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).messages({
    "string.min": "min is 3",
    "string.max": "max is 100",
    "string.pattern.base": "Будь ласка, введіть дійсну електронну адресу"
  }),
})

export default giveRoleValidator;