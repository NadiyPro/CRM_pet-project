import 'react';
import giveRoleValidator from '../../validator/giveRole.validator';


describe('giveRoleValidator', () => {

  test('valid data', () => {
    const result = giveRoleValidator.validate({
      name: 'Nadia',
      surname: 'Prosianyk',
      email: 'siroviyn13@gmail.com'
    });
    expect(result.error).toBeUndefined();
  });

  test('valid data limit name and surname', () => {
    const result = giveRoleValidator.validate({
      name: 'Nad',
      surname: 'Pro',
      email: 'siroviyn13@gmail.com'
    });
    expect(result.error).toBeUndefined();
  });

  test('no valid name', () => {
    const result = giveRoleValidator.validate({
      name: 'Na',
      surname: 'Prosianyk',
      email: 'siroviyn13@gmail.com'
    });
    // console.log(result);
    // console.log(result.error?.details);

    expect(result.error?.details[0].message).toBe('min is 3');
  });

  test('no valid surname', () => {
    const result = giveRoleValidator.validate({
      name: 'Nadia',
      surname: 'Pr',
      email: 'siroviyn13@gmail.com'
    });
    expect(result.error?.details[0].message).toBe('min is 3');
  });

  test('no valid email', () => {
    const result = giveRoleValidator.validate({
      name: 'Nadia',
      surname: 'Prosianyk',
      email: 'siroviyn.gmail.com'
    });
    expect(result.error?.details[0].message).toBe('Будь ласка, введіть дійсну електронну адресу');
  });
})
export {};

// {
//   value: { ... }, // дані які перевряємо
//   error: {
//     details: [
//       {
//         message: 'min is 3',
//         path: ['name'],
//         type: 'string.min',
//         context: { ... }
//       }
//     ]
//   }
// }