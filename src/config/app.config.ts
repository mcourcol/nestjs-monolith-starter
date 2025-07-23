import { registerAs } from '@nestjs/config';

/**
 * Application-level configuration namespace.
 *
 * This file defines configuration values related to the core application setup
 * (e.g. HTTP port) under the `app` namespace.
 *
 * ➕ To add new variables:
 * - Add them to this object (e.g. `name`, `url`, etc.)
 * - Make sure they are also declared in `validation.schema.ts`
 *
 * 📌 Access values via ConfigService:
 * ```ts
 * configService.get<number>('app.port');
 * ```
 *
 * 🧩 To define additional namespaces (e.g. `database`, `auth`, etc.):
 * 1. Create a file like `database.config.ts`
 * 2. Use `registerAs('database', () => ({ ... }))`
 * 3. Register it in `ConfigModule.forRoot({ load: [...] })`
 *
 * 📌 Example:
 * ```ts
 * export default registerAs('database', () => ({
 *   host: process.env.DB_HOST,
 *   port: Number(process.env.DB_PORT),
 * }));
 *
 * // In ConfigModule
 * load: [appConfig, databaseConfig],
 * ```
 */

export default registerAs('app', () => ({
  port: Number(process.env.PORT),
}));
