import Joi from 'joi';

const group_nameValidator = Joi.object({
  group_group_name: Joi.string().min(3).max(20).messages({
    "string.min": "min is 3",
    "string.max": "max is 20",
  })
})
 export default group_nameValidator;