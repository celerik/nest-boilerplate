/** @packages */
import 'dotenv/config';

/** @constants-application */
const appName: string = process.env.APP_PROJECT;
const appHost: string = process.env.APP_HOST;
const appPort: number = +process.env.APP_PORT;
const appVersion: string = process.env.APP_VERSION ?? 'v1';
const appPrefix: string = process.env.APP_PREFIX ?? 'api';
const appRoute: string = process.env.APP_ROUTE;
const appRouteApi = `${appRoute}/${appPrefix}/${appVersion}`;

/** @constants-database */
const dbType: string = process.env.DB_TYPE ?? 'postgres';
const dbSsl = false;
const dbHost: string = process.env.DB_HOST;
const dbPort: number = +process.env.DB_PORT;
const dbUser: string = process.env.DB_USERNAME;
const dbPassword: string = process.env.DB_PASSWORD;
const dbDatabase: string = process.env.DB_DATABASE;

/** @constants-mailer */
const mailHost: string = process.env.MAIL_HOST;
const mailPort: number = +process.env.MAIL_PORT;
const mailUser: string = process.env.MAIL_USER;
const mailPassword: string = process.env.MAIL_PASSWORD;
const mailFrom: string = process.env.MAIL_FROM;

/** @constants-jwt */
const jwtSecret: string = process.env.JWT_SECRET;
const jwtExpiresIn: number = +process.env.JWT_EXPIRES_IN ?? 3600;

/** @constants-super-admin */
const adminEmail: string = process.env.ADMIN_EMAIL;
const adminPassword: string = process.env.ADMIN_PASSWORD;
const adminUsername: string = process.env.ADMIN_USERNAME;

/** @constants-redis */
const redisHost: string = process.env.REDIS_HOST;
const redisPort: number = +process.env.REDIS_PORT;
const redisPassword: string = process.env.REDIS_PASSWORD;

/** @constants-graphql */
const graphqlPlayground: number = +process.env.GRAPHQL_PLAYGROUND ?? 0;

/** @constants-azure-storage-blob */
const azureStorageBlobSasKey: string = process.env.AZURE_STORAGE_SAS_KEY;
const azureStorageBlobAccount: string = process.env.AZURE_STORAGE_ACCOUNT;
const azureStorageBlobContainerName: string =
  process.env.AZURE_STORAGE_CONTAINER_NAME;

export const production = {
  appName,
  appHost,
  appPort,
  appVersion,
  appPrefix,
  appRoute,
  appRouteApi,
  dbType,
  dbSsl,
  dbHost,
  dbPort,
  dbUser,
  dbPassword,
  dbDatabase,
  mailHost,
  mailPort,
  mailUser,
  mailPassword,
  mailFrom,
  jwtSecret,
  jwtExpiresIn,
  adminEmail,
  adminPassword,
  adminUsername,
  redisHost,
  redisPort,
  redisPassword,
  graphqlPlayground,
  azureStorageBlobSasKey,
  azureStorageBlobAccount,
  azureStorageBlobContainerName,
};
