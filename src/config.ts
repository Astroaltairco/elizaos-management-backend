import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const config = {};

export const NODE_ENV = env
  .get('NODE_ENV')
  .default('local')
  .asEnum(['local', 'development', 'production']);

export const PORT = env.get('PORT').required().default(3680).asPortNumber();

export const REDIS_URL = env
  .get('REDIS_URL')
  .default('redis://127.0.0.1:6379')
  .asString();
export const REDIS_USERNAME = env
  .get('REDIS_USERNAME')
  .default('default')
  .asString();
export const REDIS_PASSWORD = env
  .get('REDIS_PASSWORD')
  .default('password')
  .asString();

// MTProto
export const TELEGRAM_API_ID = env
  .get('TELEGRAM_API_ID')
  .required()
  .asIntPositive();
export const TELEGRAM_API_HASH = env
  .get('TELEGRAM_API_HASH')
  .required()
  .asString();
