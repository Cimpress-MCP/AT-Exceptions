import { AxiosError } from 'axios';

function truncateToken(innerPayload: string): string {
  return innerPayload.replace(
    /(eyJ[a-zA-Z0-9_-]{5,}\.eyJ[a-zA-Z0-9_-]{5,})\.[a-zA-Z0-9_-]*/gi,
    (m, p1) => `${p1}.<sig>`,
  );
}

export function serialize(obj: unknown): object {
  let mappedObject;

  if (obj && typeof obj === 'object') {
    mappedObject = Object.getOwnPropertyNames(obj).reduce((map, key) => {
      // eslint-disable-next-line no-param-reassign
      map[key] = obj[key];
      return map;
    }, {});
  } else {
    mappedObject = obj;
  }

  return JSON.parse(truncateToken(JSON.stringify(mappedObject)));
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError;
}
