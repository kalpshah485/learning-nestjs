import { Injectable, Scope } from '@nestjs/common';
import { config } from 'dotenv';

config({
  path: `${
    process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '.development'
  }.env`,
});

@Injectable({ scope: Scope.DEFAULT })
export class ConfigService {
  private config: { [key: string]: any } = {};
  constructor() {
    this.config.env = process.env.NODE_ENV;

    this.config.database = {
      DB_TYPE: process.env.DB_TYPE,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
      DB_SCHEMA: process.env.DB_SCHEMA,
    };
  }
  public get(key: string): any {
    return this.config[key];
  }
}
