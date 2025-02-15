import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const config = {};

export const NODE_ENV = env
  .get('NODE_ENV')
  .default('local')
  .asEnum(['local', 'development', 'production']);

export const PORT = env.get('PORT').required().default(3680).asPortNumber();

export const POSTGRES_HOST = env
  .get('POSTGRES_HOST')
  .default('127.0.0.1')
  .asString();
export const POSTGRES_DB = env.get('POSTGRES_DB').default('db').asString();
export const POSTGRES_USER = env
  .get('POSTGRES_USER')
  .default('socialdao')
  .asString();
export const POSTGRES_PASSWORD = env
  .get('POSTGRES_PASSWORD')
  .default('password')
  .asString();
export const POSTGRES_PORT = env
  .get('POSTGRES_PORT')
  .default(5432)
  .asPortNumber();


export const ELIZAOS_API_URL = env.get('ELIZAOS_API_URL').required().asString();
