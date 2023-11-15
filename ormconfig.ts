import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'test',
  // database: 'test',
  type: 'mysql',
  host: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DB_SERVER,
  port: 3306,
  username: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DB_USER,
  password: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DB_PASSWORD,
  database: process.env.MYSQL_TEAMSPOON_MAIN_MASTER_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});
