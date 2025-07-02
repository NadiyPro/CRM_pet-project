import 'react';
import orderValidator from '../../validator/order.validator';

describe('orderValidator', () => {

  test('valid data', () => {
    const result = orderValidator.validate({
      name: 'Nadia',
      surname: 'Prosianyk',
      email: 'siroviyn13@gmail.com',
      phone: '380636632510',
      age: 34,
      course: 'JSCX',
      course_format: 'online',
      course_type: 'vip',
      sum: 44000,
      alreadyPaid: 11000,
      status: 'In_work'
    });
    expect(result.error).toBeUndefined();
  })

  test('valid data empty string', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error).toBeUndefined();
  })

  test('no valid name', () => {
    const result = orderValidator.validate({
      name: 'N23456789012345678901234567890',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('max is 25')
  })

  test('no valid surname', () => {
    const result = orderValidator.validate({
      name: '',
      surname: 'P23456789012345678901234567890',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('max is 25');
  })

  test('no valid email', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: 'siroviyn.gmail.com',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('Будь ласка, введіть дійсну електронну адресу');
  })

  test('no valid phone', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '388636632510',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('Номер телефону має бути у форматі: 380XXXXXXXXX');
  })

  test('no valid phone length', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '0636632510',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('Номер телефону повинен містити рівно 12 символів');
  })

  test('no valid age', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: 134,
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('max is 100');
  })

  test('no valid course', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: 'course',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('course повинен бути один з: FS, QACX, JCX, JSCX, FE, PCX');
  })

  test('no valid course_format', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: 'course_format',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('course_format повинен бути один з: static, online');
  })

  test('no valid course_type', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: 'course_type',
      sum: '',
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('course_type повинен бути один з: pro, minimal, premium, incubator, vip');
  })

  test('no valid sum', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: null,
      alreadyPaid: '',
      status: ''
    });

    expect(result.error?.details[0].message).toBe('"sum" must be a number');
  })

  test('no valid alreadyPaid', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: null,
      status: ''
    });

    expect(result.error?.details[0].message).toBe('"alreadyPaid" must be a number');
  })

  test('no valid status', () => {
    const result = orderValidator.validate({
      name: '',
      surname: '',
      email: '',
      phone: '',
      age: '',
      course: '',
      course_format: '',
      course_type: '',
      sum: '',
      alreadyPaid: '',
      status: 'status'
    });

    expect(result.error?.details[0].message).toBe('status повинен бути один з: In_work, New, Aggre, Disaggre, Dubbing');
  })

})

export {}