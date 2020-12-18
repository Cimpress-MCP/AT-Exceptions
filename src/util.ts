import { AxiosError } from 'axios';

export function serialize(obj: unknown): object {
  if (obj && typeof obj === 'object') {
    return Object.getOwnPropertyNames(obj).reduce((map, key) => {
      // eslint-disable-next-line no-param-reassign
      map[key] = obj[key];
      return map;
    }, {});
  }

  return JSON.parse(JSON.stringify(obj));
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError;
}
