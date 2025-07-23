import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { configValidationSchema } from './validation.schema';

/**
 * Global configuration module.
 *
 * This module sets up the application's configuration system using NestJS's
 * `@nestjs/config` package. It loads environment variables from a `.env.{NODE_ENV}`
 * file (e.g., `.env.development`), validates them using a Joi schema,
 * and makes the configuration available globally via `ConfigService`.
 *
 * Key features:
 * - Loads environment variables from `.env.{NODE_ENV}`
 * - Skips loading `.env` files in production for security and performance
 * - Validates environment variables against `configValidationSchema` to prevent misconfiguration
 * - Supports loading multiple configuration namespaces via the `load` array (e.g., `appConfig`)
 * - Allows unknown variables and reports all validation errors at once (`allowUnknown`, `abortEarly`)
 * - Caches configuration values for better performance
 *
 * 🧩 To extend configuration:
 * - Add more namespaces by creating new config files using `registerAs`
 * - Register these new configs in the `load` array here
 *
 * Example usage:
 * ```ts
 * const configService = app.get(ConfigService);
 * const port = configService.get<number>('app.port');
 * ```
 *
 * @module ConfigModule
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [appConfig],
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      cache: true,
    }),
  ],
})
export class ConfigModule {}
