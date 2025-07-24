// src/core/logger/logger.module.ts

import { Module, Global } from '@nestjs/common';
import { LOGGER_SERVICE } from './logger.token';
import { WinstonLoggerService } from './drivers/winston.logger';
import { ConfigService } from '@nestjs/config';
import { PinoLoggerService } from './drivers/pino.logger';

@Global()
@Module({
  imports: [],
  providers: [
    PinoLoggerService,
    WinstonLoggerService,

    {
      provide: LOGGER_SERVICE,
      inject: [ConfigService, PinoLoggerService, WinstonLoggerService],
      useFactory: (
        configService: ConfigService,
        pinoLogger: PinoLoggerService,
        winstonLogger: WinstonLoggerService,
      ) => {
        const driver = configService.get<string>('app.logDriver', {
          infer: true,
        });

        switch (driver) {
          case 'pino':
            return pinoLogger;
          case 'winston':
            return winstonLogger;
          default:
            throw new Error(`Unknown logger driver: ${driver}`);
        }
      },
    },
  ],
  exports: [LOGGER_SERVICE],
})
export class LoggerModule {}
