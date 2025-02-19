import knex, { Knex } from 'knex';
import {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} from './config';

export const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    port: POSTGRES_PORT,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
};

const db = knex(knexConfig);

export default db;
