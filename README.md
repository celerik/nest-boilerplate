# Celerik NestJs Bolierplate

## Description

Baseline for starting a NestJS project

## Installation

```bash
# installation of dependencies
$ npm i
# o
$ yarn install

# creation of the .env file based on the .env.example file
$ cp .env.example .env

# note: in the .env file you must add the credentials of your database

# ------ step optional -------
# if you don't have a database, you can create a docker-compose.yml 
# file based on the docker-compose.yml.example file in the project

$ cp docker-compose.yml.example docker-compose.yml
$ docker-compose up

# you must have previously installed docker and docker-compose on 
# your computer, so that it runs properly, if everything is correct 
# you should have your project database ready.
# ------ step optional -------

# execution of migrations
$ npm run typeorm migration:run
# o
$ yarn migration:run

# execution of seeds
$ npm run seed:run
# o
$ yarn seed:run
# note: if you want to run one command to do everything you can
# try the command: npm run seed-run:clear o yarn seed-run:clear

# ------ step optional -------
# you can enable husky on the project to make sure your project 
# is better at running linters, checking the structure of your 
# comments on commits and building the project before making 
# any commits automatically

# installation of husky
$ npm run prepare
# o
$ yarn prepare

# adding the pre-commit command
$ npm run pre-commit-lint
# o
$ yarn pre-commit-lint

# adding the commit-msg command
$ npm run commit-msg-lint
# o
$ yarn commit-msg-lint

# make sure that in the .husky/commit-msg file this 
# npx --no-install commitlint --edit "$1"
# is sentenced in line 4
# ------ step optional -------
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

```bash
# the default paths of the project are:
$ http://localhost:8000/api/v1/users        # GET
$ http://localhost:8000/api/v1/roles        # GET
$ http://localhost:8000/api/v1/permissions  # GET
$ http://localhost:8000/api/v1/auth/login   # POST
$ http://localhost:8000/api/v1/auth/logout  # POST

# note: by default it is port 8000, but if you use another port,
# replace port you replace the 8000 with your port and that's it, 
# an easier way to see what are all your endpoints if you are in
# a local or development environment is to go to the path:

$ http://localhost:8000/docs

# the default credentials are:
username: admin
password: password
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
