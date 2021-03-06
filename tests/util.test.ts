import { isAxiosError, serialize } from '../src';

describe('Util', () => {
  const message = 'tests-error-message';
  const error = new Error(message);

  describe('serialize', () => {
    test('serializes Error objects', () => {
      const expected = {
        message,
        stack: expect.any(String),
      };
      const serializedError = serialize(error);
      expect(serializedError).toEqual(expected);
    });

    test('serializes Error string', () => {
      const expected = 'test-error-string';
      const serializedError = serialize(expected);
      expect(serializedError).toEqual(expected);
    });

    test('truncates token during serialization', () => {
      const expected = {
        headers: {
          Authorization: 'Bearer eyJ111111.eyJ222222.<sig>',
        },
      };
      const serializedError = serialize({
        headers: {
          Authorization: 'Bearer eyJ111111.eyJ222222.333333',
        },
      });
      expect(serializedError).toEqual(expected);
    });

    test('serializes Error object', () => {
      const expected = {
        stringProp: 'string-prop-value',
        objectProp: {
          innerProp: 'inner-prop-value',
          innerObjectProp: {
            innerObjectPropKey: 'inner-object-prop-value',
          },
        },
      };

      const serializedError = serialize(expected);
      expect(serializedError).toEqual(expected);
    });
  });

  describe('isAxiosError', () => {
    test('works as type predicate', () => {
      const testError: unknown = {
        isAxiosError: true,
        response: { status: 200 },
      };

      // without the if condition, this would be a typescript compile error
      if (isAxiosError(testError)) {
        expect(testError.response?.status).toEqual(200);
      }
    });

    test('returns false when the error is undefined', () => {
      expect(isAxiosError(undefined)).toBeFalsy();
    });
  });
});
