// src/logger/logger.module.ts
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize(),
        winston.format.printf((info) => {
          const metadata: any = { ...info };
          delete metadata.timestamp;
          delete metadata.level;
          delete metadata.message;
          return `${info.timestamp} ${info.level}: ${info.message}\n${JSON.stringify(metadata, null, 2)}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new (winston.transports as any).DailyRotateFile({
          filename: join(__dirname, '../../logs/api-error-%DATE%.log'),
          datePattern: 'YYYY-MM',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '12',
          level: 'error',
        }),
        new (winston.transports as any).DailyRotateFile({
          filename: join(__dirname, '../../logs/api-%DATE%.log'),
          datePattern: 'YYYY-MM',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '12',
        }),
      ],
    }),
  ],
})
export class LoggerModule {}
