/** @packages */
import 'dotenv/config';

/** @constants-application */
const appName: string = process.env.APP_PROJECT ?? 'Baseline Celerik';
const appHost: string = process.env.APP_HOST ?? 'localhost';
const appPort: number = +process.env.APP_PORT ?? 8000;
const appVersion: string = process.env.APP_VERSION ?? 'v1';
const appPrefix: string = process.env.APP_PREFIX ?? 'api';
const prefixHttps = 'http';
const appRoute = `${prefixHttps}://${appHost}:${appPort}`;
const appRouteApi = `${appRoute}/${appPrefix}/${appVersion}`;

/** @constants-database */
const dbType: string = process.env.DB_TYPE ?? 'postgres';
const dbSsl = false;
const dbHost: string = process.env.DB_HOST ?? 'localhost';
const dbPort: number = +process.env.DB_PORT ?? 5432;
const dbUser: string = process.env.DB_USERNAME;
const dbPassword: string = process.env.DB_PASSWORD;
const dbDatabase: string = process.env.DB_DATABASE ?? 'celerik_local';

/** @constants-mailer */
const mailHost: string = process.env.MAIL_HOST;
const mailPort: number = +process.env.MAIL_PORT;
const mailUser: string = process.env.MAIL_USER;
const mailPassword: string = process.env.MAIL_PASSWORD;
const mailFrom: string = process.env.MAIL_FROM;

/** @constants-jwt */
const jwtSecret: string = process.env.JWT_SECRET;
const jwtExpiresIn: number = +process.env.JWT_EXPIRES_IN ?? 36000;

/** @constants-super-admin */
const adminEmail: string = process.env.ADMIN_EMAIL ?? 'dvega@celerik.com';
const adminPassword: string = process.env.ADMIN_PASSWORD ?? 'password';
const adminUsername: string = process.env.ADMIN_USERNAME ?? ' admin';

/** @constants-redis */
const redisHost: string = process.env.REDIS_HOST ?? 'localhost';
const redisPort: number = +process.env.REDIS_PORT ?? 6379;
const redisPassword = '';

/** @constants-graphql */
const graphqlPlayground: number = +process.env.GRAPHQL_PLAYGROUND ?? 1;

/** @constants-azure-storage-blob */
const azureStorageBlobSasKey: string = process.env.AZURE_STORAGE_SAS_KEY;
const azureStorageBlobAccount: string =
  process.env.AZURE_STORAGE_ACCOUNT ?? 'stgbgimagesdev';
const azureStorageBlobContainerName: string =
  process.env.AZURE_STORAGE_CONTAINER_NAME ?? 'temporary';

export const local = {
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
