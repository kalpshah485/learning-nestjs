// import { join } from 'path';
// import { Event } from 'src/events/entities/event.entity';
// import { Coffee } from 'src/modules/coffees/entities/coffee.entity';
// import { Flavor } from 'src/modules/coffees/entities/flavor.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  schema: 'public',
  name: 'default',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  migrationsRun: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
