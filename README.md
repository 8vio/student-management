# Student Result Management System API


## Running the application in a Docker Container

Running the application with Docker

### Prerequisites

To test locally or build the Docker image, install docker [link](https://docs.docker.com/engine/install/)

## Run the application

Run the following command:

```sh
npm run services:up
```

The following containers should be created and you can expect an output like this:

```sh
[+] Running 3/3
 ✔ Network student-management_default  Created                               0.0s
 ✔ Container postgres-students         Started                               0.7s
 ✔ Container backend-students          Started                               1.2s
```

## Running the application

Running the application without Docker, however Docker will be necessary to create a postgreSQL database

### Preriquisites

This application is built in Typescript and runs in a NodeJS runtime environment for that reason if it's going to be tested or deployed on a local machine without a Docker container, please install the las version of NodeJS [NodeJS](https://nodejs.org/en/download) and NPM. However this project was also built to run inside a Docker Container, check here how to proceed: [Running the application in a Docker Container](#running-the-application-in-a-docker-container)

### Install dependencies

Dependencies located in `package.json`

```sh
npm install
```
### Modify the datasource

The datasource was modify to point to the postgresSQL docker image inside the container.

Go to /src/datasources/studentsmgt.datasource.ts uncomment the line with `localhost` as host and comment the line with `postgres-students` as host

```sh
  // url: 'postgres://studentmgt-user:studentmgt-password@localhost/studentsmgt',
  url: 'postgres://studentmgt-user:studentmgt-password@postgres-students/studentsmgt',
```

### Start the database

The database is created in a Docker container with the following command:

```sh
npm run services:up-local
```

Expected output

```sh
 ✔ Network student-management_default  Created            0.0s
 ✔ Container postgres-students         Started            0.5s
```

## Run the application

Before start, the application will migrate database schemas. The Migration could be performed individually, check [here](#other-useful-commands) for more detail

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3001 in your browser.

Swagger url http://127.0.0.1:3001/explorer/

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container


# Create a user (Opened for testing purposes)

Use the endpoint `POST localhost:3000/sign-up`

```sh
{
"username":"YourUser",
"password": "YourPassword"
}
```

or directly through the swagger http://localhost:3001/explorer/#/LoginController/LoginController.create clicking in `Try it out`

