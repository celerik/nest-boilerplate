/** @packages */
import 'dotenv/config';

/** @module */
import { local } from './local';
import { development } from './development';
import { production } from './production';
import { staging } from './staging';

/** @constants */
const environment = process.env.NODE_ENV ?? 'development';
const isLocalEnv = environment === 'local';
const isDevelopmentEnv = environment === 'development';
const isStagingEnv = environment === 'staging';
const isProductionEnv = process.env.NODE_ENV === 'production';

let varsEnv = development;

if (environment === 'local') {
  varsEnv = local;
}

if (environment === 'production') {
  varsEnv = production;
}

if (environment === 'staging') {
  varsEnv = staging;
}

const {
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
} = varsEnv;

const whiteListMethodsHttp = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

let whiteListRoutes: boolean | string | RegExp | (string | RegExp)[] = [
  appRouteApi,
  appRoute,
  'http://localhost:8000',
  'http://localhost:5000',
  'http://localhost:3000',
];

if (isDevelopmentEnv) {
  whiteListRoutes = [
    appRouteApi,
    appRoute,
    'http://localhost:8000',
    'http://localhost:5000',
    'http://localhost:3000',
  ];
}

if (isStagingEnv) {
  whiteListRoutes = [appRouteApi, appRoute];
}

if (isProductionEnv) {
  whiteListRoutes = [appRouteApi, appRoute];
}

export {
  environment,
  isLocalEnv,
  isDevelopmentEnv,
  isStagingEnv,
  isProductionEnv,
  whiteListRoutes,
  whiteListMethodsHttp,
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
};
