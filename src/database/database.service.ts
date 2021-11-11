import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'tls';
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'dotenv/config';

const type = process.env.DB_TYPE;
const host = process.env.DB_HOST;
const port = +process.env.DB_PORT;
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const development = process.env.NODE_ENV === 'development';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory() {
      return {
        ssl: false,
        type,
        host,
        port,
        database,
        username,
        password,
        logging: development,
        entities: [
          `${__dirname}/../**/*.entity{.ts,.js}`,
          `${__dirname}/../database/entities/*{.ts,.js}`,
        ],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        subscribers: [__dirname + '/subscribers/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
