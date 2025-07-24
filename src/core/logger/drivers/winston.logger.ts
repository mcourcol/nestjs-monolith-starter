import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractLoggerService } from '../logger.service';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class WinstonLoggerService extends AbstractLoggerService {
  private readonly logger: Logger;

  constructor(private readonly configService: ConfigService) {
    super();

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    this.logger = createLogger({
      level: isProd ? 'info' : 'debug',
      format: format.combine(
        format.timestamp(),
        format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        isProd ? format.json() : format.colorize(),
        format.printf(
          ({ timestamp, level, message }) =>
            `[${timestamp}] ${level}: ${message}`,
        ),
      ),
      transports: [new transports.Console()],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { context, stack: trace });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
