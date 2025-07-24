// src/core/logger/drivers/pino.logger.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractLoggerService } from '../logger.service';
import pino from 'pino';
import pretty from 'pino-pretty';

@Injectable()
export class PinoLoggerService extends AbstractLoggerService {
  private readonly logger: pino.Logger;

  constructor(private readonly configService: ConfigService) {
    super();

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    this.logger = isProd
      ? pino({
          level: 'info',
        })
      : pino(
          {
            level: 'debug',
          },
          pretty({
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          }),
        );
  }

  log(message: any, context?: string) {
    this.logger.info({ context }, message);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({ context, trace }, message);
  }

  warn(message: any, context?: string) {
    this.logger.warn({ context }, message);
  }

  debug(message: any, context?: string) {
    this.logger.debug({ context }, message);
  }

  verbose(message: any, context?: string) {
    this.logger.trace({ context }, message);
  }
}
