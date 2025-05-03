import Joi from 'joi';

const authPasswordValidator = Joi.object({
    password: Joi.string().required().min(5).max(300).custom((item, helpers) => {
      if (item === 'admin') {
        return item;
      } else {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!pattern.test(item)) {
          return helpers.error('string.pattern.base');
        }
      }
      return item;
    }).messages({
      "string.empty": "Поле має бути заповнене",
      "string.min": "min is 5",
      "string.max": "max is 300",
      "string.pattern.base": "Пароль повинен містити принаймні одну літеру, одну цифру та один спеціальний символ, і бути не менше 8 символів"
    }),
    confirm_password: Joi.string().required().min(5).max(300).custom((password, helpers) => {
      if (password === 'admin') {
        return password;
      } else {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!pattern.test(password)) {
          return helpers.error('string.pattern.base');
        }
      }
      return password;
    }).messages({
      "string.empty": "Поле має бути заповнене",
      "string.min": "min is 5",
      "string.max": "max is 300",
      "string.pattern.base": "Пароль повинен містити принаймні одну літеру, одну цифру та один спеціальний символ, і бути не менше 8 символів"
    }),
})

export default authPasswordValidator;