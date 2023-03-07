# Multi-Tenant Todos Microservice Backend

This is a backend microservice for a multi-tenant to-do application, implemented in NodeJS, ExpressJS, and PostgreSQL. It also uses Docker for containerization, JWT for authentication, Typescript for strong typing, and Logging for debugging.

## Getting Started

### Prerequisites

-   Docker
-   Docker Compose

### Installing

1. Clone the repository

```bash
git clone
```

2. Run the docker-compose file

```bash
npm run db:reset
```

3. Run the migrations

```bash
npm run db:migrate
```

4. Run the seeders

```bash
npm run db:seed
```

5. Run the application

```bash
npm run start:dev
```

## Running the tests

Run the docker-compose file to reset the database

```bash
npm run db:reset
```

2. Run the tests

```bash
npm run test
```

## Built With

-   [NodeJS](https://nodejs.org/en/) - JavaScript runtime
-   [ExpressJS](https://expressjs.com/) - Web framework
-   [PostgreSQL](https://www.postgresql.org/) - Database
-   [Docker](https://www.docker.com/) - Containerization
-   [JWT](https://jwt.io/) - Authentication
-   [Typescript](https://www.typescriptlang.org/) - Strong typing

## Authors

[Mostafa Abouzeid](https://github.com/Mostafatalaat770)
