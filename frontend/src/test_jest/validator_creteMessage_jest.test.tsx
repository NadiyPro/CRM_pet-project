import 'react';
import createMessageValidator from '../validator/createMessage.validator';

describe('createMessageValidator', () => {

  test('valid messages', () => {

    const result = createMessageValidator.validate({

      messages: 'test_text'
    });
    expect(result.error).toBeUndefined();
  })

  test('valid messages item 5', () => {

    const result = createMessageValidator.validate({

      messages: 't2345'
    });
    expect(result.error).toBeUndefined();
  })

  test('no valid messages', () => {

    const result = createMessageValidator.validate({

      messages: 't2'
    });
    expect(result.error?.details[0].message).toBe('min is 5');
  })

})

export {};