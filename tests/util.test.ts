import { isAxiosError, serialize } from '../src/util';

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
  });
});
