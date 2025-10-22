import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, query, params, body } = req;
    const startTime = Date.now();

    // Sanitize sensitive data
    const sanitizedBody = { ...body };
    if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
    if (sanitizedBody.paymentTokenId)
      sanitizedBody.paymentTokenId = '[REDACTED]';

    this.logger.log(`Incoming ${method} request to ${originalUrl}`);

    const chunks: Buffer[] = [];
    const oldWrite = res.write.bind(res);
    const oldEnd = res.end.bind(res);

    res.write = ((chunk: any, ...args: any[]) => {
      chunks.push(Buffer.from(chunk));
      return oldWrite(chunk, ...args);
    }) as any;

    res.end = ((chunk: any, ...args: any[]) => {
      if (chunk) chunks.push(Buffer.from(chunk));
      const responseBody = Buffer.concat(chunks).toString('utf8');
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `Outgoing response for ${method} ${originalUrl} - Status: ${res.statusCode} (${responseTime}ms)`,
      );
      this.logger.debug(`Response body: ${responseBody}`);

      return oldEnd(chunk, ...args);
    }) as any;

    next();
  }
}
