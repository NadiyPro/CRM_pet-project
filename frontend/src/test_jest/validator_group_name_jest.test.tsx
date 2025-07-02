import 'react';
import group_nameValidator from '../validator/group_name.validator';

describe('group_nameValidator', () => {

  test('valid data', () => {
    const result = group_nameValidator.validate({
      group_name: 'test text'
    })
    expect(result.error).toBeUndefined();
  })

  test('valid data item 20', () => {
    const result = group_nameValidator.validate({
      group_name: 't2345678901234567890'
    })
    expect(result.error).toBeUndefined();
  })

  test('no valid group_name min', () => {
    const result = group_nameValidator.validate({
      group_name: 'te'
    })
    expect(result.error?.details[0].message).toBe('min is 3')
  })

  test('no valid group_name max', () => {
    const result = group_nameValidator.validate({
      group_name: 't23456789012345678901234567'
    })
    expect(result.error?.details[0].message).toBe('max is 20')
  })

})

export {};