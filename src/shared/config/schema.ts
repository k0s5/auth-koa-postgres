import Joi from 'joi'

export const envSchema = Joi.object({
  // Основные настройки
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port(),

  // CORS
  CORS_ORIGIN: Joi.string().default('*'),

  // Password
  SALT_ROUNDS: Joi.number().default(10),

  // Postgres
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.string(),
  POSTGRES_DB_NAME: Joi.string(),
  POSTGRES_INTERNAL_PORT: Joi.string(),
  POSTGRES_EXTERNAL_PORT: Joi.string(),
  POSTGRES_ADMINER_INTERNAL_PORT: Joi.string(),
  POSTGRES_ADMINER_EXTERNAL_PORT: Joi.string(),

  // Secrets
  ACCESS_TOKEN_SECRET: Joi.string(),
  ACCESS_TOKEN_LIFETIME: Joi.string(),
  REFRESH_TOKEN_SECRET: Joi.string(),
  REFRESH_TOKEN_LIFETIME: Joi.string(),

  // Email
  // SMTP_HOST: Joi.string().when('NODE_ENV', {
  //   is: 'production',
  //   then: Joi.required(),
  //   otherwise: Joi.optional(),
  // }),
  // SMTP_PORT: Joi.number().port().default(587),
  // SMTP_USER: Joi.string().email().optional(),
  // SMTP_PASSWORD: Joi.string().optional(),

  // Other settings
  // LOG_LEVEL: Joi.string()
  //   .valid('error', 'warn', 'info', 'debug')
  //   .default('info'),
})
  // .unknown() // allow variables that not defined in schema
  .required()
