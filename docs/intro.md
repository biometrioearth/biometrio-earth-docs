---
sidebar_position: 1
---

# Balam intro

Balam helps to manage biometrio.earth monitoring projects. It's built using Django (ver 4.1), and GraphQL with Graphene for the API.

## Getting Started

If you want to deploy Balam you'll need to create an `.env` file and meet certain requirements in your system.

### What you'll need

- [docker](https://www.docker.com/get-started/) version 20.10.18 or above
- [docker-compose](https://docs.docker.com/compose/) version 1.29.2 or above
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) version 1.22 or above

## First steps

Before anything, you'll need to create an .env file. You can use .env.example to create it. This are the contents of the file:

```bash
#Django
DEBUG=1
SECRET_KEY="mysecretkey" # define a different secret key for your project
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 0.0.0.0 [::1] * # change to your desired allowed hosts
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:3000 http://127.0.0.1:3000 # change to your desired allowed origins
SESSION_EXPIRATION=120 # time in minutes of session expiration
BASE_URL=''

# database access credentials
# change as needed
BALAM_DATABASE_NAME=example_balam_db
BALAM_DATABASE_USER=postgres
BALAM_DATABASE_PASSWORD=postgres
BALAM_DATABASE_HOST=balam_db
BALAM_DATABASE_PORT=5432
DEV_EXPOSE_DB_PORT=5433 # this port is used to expose the database to the host, maybe try a different one than 5432

# docker app port
# with this one we expose the app, you can change it to any other port you want
BALAM_APP_PORT=7070

# default superuser
# needed!
# with this you'll define the default superuser in the platform
BALAM_SUPERUSER="admin"
BALAM_SUPERUSER_PASS="somepassword"
```

once created, you can run the containers to start using this project.

## Useful commands

There are some useful commands to easily handle the containers in this project. We use yarn to manage this commands, that's why it's needed as a requirement. The commands are the following:

```bash
$ yarn start <dev|aws> # starts all containers in the background, can use it also to build them for the first time.

$ yarn stop <dev|aws> # stops the containers

$ yarn restart <dev|aws> <service name> # restarts the service specified

$ yarn logs <dev|aws> <service name> # shows logs for the desired service
```

It is important to specify the environment, either dev or aws. The aws environment doesn't use a db container. 
And if you don't want to use yarn, that's ok! You can always use the docker-compose `up`, `down`, `restart` commands.

## Run the project

To build and start the containers you can use `yarn start` command. Once build and up, you can access to the default endpoints in this routes:

- graphql:
  ```bash
  # graphql endpoint
  http://localhost:<BALAM_APP_PORT>/graphql/
  ```

- graphiql:
  ```bash
  # graphiql interface for testing queries and mutations
  http://localhost:<BALAM_APP_PORT>
  ```

- admin
  ```bash
  # default django admin site
  http://localhost:<BALAM_APP_PORT>/admin/
  ```

- postgres: is exposed on the port you specified with `DEV_EXPOSE_DB_PORT` in you `.env` file
