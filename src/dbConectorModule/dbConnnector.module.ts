import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

export const provide = Symbol('dbConnector');

const provider = {
  provide,
  useFactory: () => new Client({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  }),
};

@Global()
@Module({
  providers: [provider],
  exports: [provider],
})
export class DbConnectorModule {}
