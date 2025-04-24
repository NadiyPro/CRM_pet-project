import Joi from "joi";

const authLoginValidator = Joi.object({
  email: Joi.string().max(300).pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).messages({
    "string.empty": " ",
    "string.max": "max is 300 allowed",
    "string.pattern.base": "Будь ласка, введіть дійсну електронну адресу."
  }),
  password: Joi.string().min(5).max(300).custom((value) => {
    if (value === 'admin') {
      return value;
    }}).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).messages({
    "string.empty": " ",
    "string.min": "min is 5 allowed",
    "string.max": "max is 300 allowed",
    "string.pattern.base": "Пароль повинен містити принаймні одну літеру, одну цифру та один спеціальний символ, і бути не менше 8 символів."
  })
});

export default authLoginValidator;