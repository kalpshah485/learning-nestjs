import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './db/data-source';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    DatabaseModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
