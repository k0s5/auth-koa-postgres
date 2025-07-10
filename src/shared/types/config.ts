export interface IConfig {
  nodeEnv: 'development' | 'production' | 'test'
  isDev: boolean

  ports: {
    service: number
  }

  saltRounds: number

  postgres: { uri: string }

  cors?: {
    origin: string
  }

  secrets: {
    accessToken: string
    refreshToken: string
    accessTokenLifetime: string
    refreshTokenLifetime: string
    cookie: string
  }
}
