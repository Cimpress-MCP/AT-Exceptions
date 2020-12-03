import { Exception } from './exception';

export class ClientException extends Exception {
  private static readonly statusCodeMap: Record<number, number> = {
    400: 422,
    401: 401,
    403: 403,
    404: 422,
  };

  constructor(serviceName: string, error?: unknown) {
    super('Dependent service returned error', ClientException.convertStatusCode(error as object), {
      error,
      serviceName,
    });
  }

  private static convertStatusCode(details?: object) {
    let statusCode = 503;
    let originalStatusCode;
    if (details && 'statusCode' in details) {
      originalStatusCode = parseInt((details as any).statusCode, 10);
    } else if (details && 'status' in details) {
      originalStatusCode = parseInt((details as any).status, 10);
    }
    if (this.statusCodeMap[originalStatusCode]) {
      statusCode = this.statusCodeMap[originalStatusCode];
    }
    return statusCode;
  }
}
