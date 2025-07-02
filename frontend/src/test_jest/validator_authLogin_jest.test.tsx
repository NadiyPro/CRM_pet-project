import 'react';
import authLoginValidator from '../validator/authLogin.validator';

describe('authLoginValidator', () => {

  test('valid data admin', () => {
    const result = authLoginValidator.validate({
      email: 'admin@gmail.com',
      password: 'admin'
    })
    expect(result.error).toBeUndefined();
  });

  test('valid data', () => {
    const result = authLoginValidator.validate({
      email: 'manager1@gmail.com',
      password: 'Password111!'
    })
    expect(result.error).toBeUndefined();
  });

  test('no valid data empty', () => {
    const result = authLoginValidator.validate({
      email: '',
      password: ''
    })
    expect(result.error?.details[0].message).toBe('Поле має бути заповнене');
  });

  test('no valid email', () => {
    const result = authLoginValidator.validate({
      email: 'manager.gmail.com',
      password: 'Password111!'
    })
    expect(result.error?.details[0].message).toBe('Будь ласка, введіть дійсну електронну адресу');
  });

  test('no valid password', () => {
    const result = authLoginValidator.validate({
      email: 'manager1@gmail.com',
      password: 'password111'
    })
    expect(result.error?.details[0].message).toBe('Пароль повинен містити принаймні одну літеру, одну цифру та один спеціальний символ, і бути не менше 8 символів');
  });
})

export {};