import dotenv from 'dotenv'
import { envSchema } from './schema'
import type { IConfig } from '@shared/types'

// Load environment variables from a specific .env file
dotenv.config({
  path: require.resolve('../../../.env'),
})

function validateEnv(): IConfig {
  const { error, value } = envSchema.validate(process.env, {
    abortEarly: false, // show all errors
    stripUnknown: true, // remove unknown fields
  })

  if (error) {
    const errorMessage = error.details
      .map((detail) => `${detail.path.join('.')}: ${detail.message}`)
      .join('\n')

    throw new Error(`Config validation error:\n${errorMessage}`)
  }

  // Transform a flat structure into a nested one
  return {
    nodeEnv: value.NODE_ENV,
    isDev: value.NODE_ENV === 'development',

    ports: {
      service: value.PORT,
    },

    saltRounds: value.SALT_ROUNDS,

    cors: {
      origin: value.CORS_ORIGIN,
    },

    postgres: {
      uri: `postgresql://${value.POSTGRES_USER}:${value.POSTGRES_PASSWORD}@${value.POSTGRES_HOST}:${value.POSTGRES_EXTERNAL_PORT}/${value.POSTGRES_DB_NAME}`,
    },

    secrets: {
      accessToken: value.ACCESS_TOKEN_SECRET,
      refreshToken: value.REFRESH_TOKEN_SECRET,
      accessTokenLifetime: value.ACCESS_TOKEN_LIFETIME,
      refreshTokenLifetime: value.REFRESH_TOKEN_LIFETIME,
      cookie: value.COOKIE_SECRET,
    },
  }
}

// Exporting the validated configuration
export const config: IConfig = validateEnv()

// Additional utilities
export const isDevelopment = () => config.nodeEnv === 'development'
export const isProduction = () => config.nodeEnv === 'production'
export const isTest = () => config.nodeEnv === 'test'
