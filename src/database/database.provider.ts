/** @packages */
import { DynamicModule } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  dbDatabase,
  dbHost,
  dbPassword,
  dbPort,
  dbSsl,
  dbType,
  dbUser,
  isDevelopmentEnv,
  isLocalEnv,
} from '@base/environments';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  async useFactory() {
    return {
      ssl: dbSsl,
      type: dbType,
      host: dbHost,
      port: dbPort,
      database: dbDatabase,
      username: dbUser,
      password: dbPassword,
      logging: isDevelopmentEnv || isLocalEnv,
      entities: [
        `${__dirname}/../**/*.entity{.ts,.js}`,
        `${__dirname}/../database/entities/*{.ts,.js}`,
      ],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      subscribers: [__dirname + '/subscribers/*{.ts,.js}'],
    } as ConnectionOptions;
  },
});
