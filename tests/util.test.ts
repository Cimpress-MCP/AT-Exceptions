import { serialize } from '../src/util';

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
});
