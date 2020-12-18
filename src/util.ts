import { AxiosError } from 'axios';

export function serialize(obj: unknown): object {
  return JSON.parse(JSON.stringify(obj, Object.getOwnPropertyNames(obj)));
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError;
}
