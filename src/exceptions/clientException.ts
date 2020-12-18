import { AxiosError } from 'axios';
import { Exception } from './exception';
import { isAxiosError } from '../util';

export class ClientException extends Exception {
  public readonly originalStatusCode?: number;

  private static readonly statusCodeMap: Record<number, number> = {
    400: 422,
    401: 401,
    403: 403,
    404: 422,
  };

  constructor(serviceName: string, error?: AxiosError | unknown) {
    super('Dependent service returned error', ClientException.convertStatusCode(error), {
      error,
      serviceName,
    });

    this.originalStatusCode = isAxiosError(error) ? error.response?.status : undefined;
  }

  private static convertStatusCode(details?: AxiosError | unknown) {
    let statusCode = 503;

    if (isAxiosError(details)) {
      const originalStatusCode = details.response?.status;
      if (originalStatusCode && this.statusCodeMap[originalStatusCode]) {
        statusCode = this.statusCodeMap[originalStatusCode];
      }
    }

    return statusCode;
  }
}
