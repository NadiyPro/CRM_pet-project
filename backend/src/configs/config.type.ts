export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: JwtConfig;
  email: EmailConfig;
};

export type AppConfig = {
  port: number;
  host: string;
  emailServerUrl: string;
};
export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
};
export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};
export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  accessActiveExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};

export type EmailConfig = {
  email: string;
  password: string;
};
