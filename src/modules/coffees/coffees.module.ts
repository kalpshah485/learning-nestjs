import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
// import { ConfigService } from 'src/config/config.service';
import { Event } from 'src/events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    // ConfigModule
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    ConfigService,
    {
      provide: 'COFFEE_BRANDS',
      useFactory: async (): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        console.log('[!] Async Factory');
        return coffeeBrands;
      },
    },
  ],
})
export class CoffeesModule {}
