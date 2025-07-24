import * as Joi from 'joi';

/**
 * Joi validation schema for environment variables.
 *
 * This schema validates that all required environment variables are set and have valid values
 * before the application starts. If validation fails, the app will refuse to start,
 * preventing misconfiguration issues.
 *
 * Variables currently validated:
 * - `NODE_ENV`: must be one of `'development' | 'production' | 'test'` (required)
 * - `PORT`: HTTP server port (default: `3000`)
 *
 * ➕ To add new variables:
 * 1. Add them here using Joi validation rules, for example:
 *    ```ts
 *    MY_FEATURE_ENABLED: Joi.boolean().default(false),
 *    API_KEY: Joi.string().required(),
 *    ```
 * 2. Add the corresponding environment variables to your `.env` files.
 * 3. Reference them in your config namespace files (e.g. `app.config.ts`) using `registerAs`.
 *
 * 📌 This schema is passed to `ConfigModule.forRoot({ validationSchema })`.
 */
export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  LOG_DRIVER: Joi.string().valid('winston', 'pino').required(),
});
