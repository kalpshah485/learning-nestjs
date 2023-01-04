import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { DataSource } from 'typeorm';

const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const configdb = configService.get('database');
      const env = configService.get('env');
      const dataSource = new DataSource({
        name: 'default',
        type: 'postgres',
        host: configdb.DB_HOST,
        port: configdb.DB_PORT,
        username: configdb.DB_USER,
        password: configdb.DB_PASSWORD,
        database: configdb.DB_NAME,
        schema: configdb.DB_SCHEMA,
        entities: [__dirname + 'dist/**/*.entity.js'],
        logging: env === 'development',
        synchronize: false,
      });
      return await dataSource.initialize();
    },
    inject: [ConfigService],
  },
  ConfigService,
];

@Module({
  exports: [...databaseProviders],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
