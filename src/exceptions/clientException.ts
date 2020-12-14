import { AxiosError } from 'axios';
import { Exception } from './exception';
import { isAxiosError } from '../util';

export class ClientException extends Exception {
  private static readonly statusCodeMap: Record<number, number> = {
    400: 422,
    404: 422,
  };

  constructor(serviceName: string, error?: AxiosError | unknown) {
    super('Dependent service returned error', ClientException.convertStatusCode(error), {
      error,
      serviceName,
    });
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
