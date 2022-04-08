# WKU Carpooling System Backend

This is the repository for a senior capstone project - WKU Carpooling System.

The project is frontend and backend separated. This repository is for the backend of the system.

Find the frontend of the system [here](https://github.com/csjkevin/wku-carpooling-system-frontend).

## Getting Started

### Install Project Dependencies

The app relies on many packages. You need to install dependencies before starting the project.

The packages of the project is managed by npm (Node Package Manager) or other node package manager such as yarn, pnpm, etc. You can install the packages by running:

`npm install`

If you have Node.js installed in your system, you should have the command of npm. If not, you can check [Node.js](https://nodejs.org/).

### Install Relied Services

The app relies on the following services:

* [PostgreSQL](https://www.postgresql.org): To keep the persistent data such as users, orders, etc. You can use MySQL, too.
* [Redis](https://redis.io): To keep the temporary data such as cache, session, etc.

You need to install them before starting the project.

### Set Environment Variables

The app relies on the following credentials:

* Database name, username and password: Used for database connection.
* WKU email address and password: Used to send notification emails such as user registration, order updates, etc. The email address should be of WKU since the emails are delivered to WKU users.

To avoid the credentials appear in the source code, you should keep them in environment variables. Run:

```
export WKU_CARPOOLING_SYSTEM_DB_USER=your_database_username
export WKU_CARPOOLING_SYSTEM_DB_PASS=your_database_password
export WKU_CARPOOLING_SYSTEM_DB_NAME=your_database_name
export WKU_CARPOOLING_SYSTEM_EMAIL_USER=your_wku_email_address
export WKU_CARPOOLING_SYSTEM_EMAIL_PASS=your_wku_email_password
```

So the app can access the credentials from `process.env`.

## Development

To start the server in the development mode, run:

`npm run dev`

Access the APIs through [http://localhost:7001](http://localhost:7001).

The server will restart when you make changes.

## Deployment

To start the server in the production mode, run:

`npm start`

## Collaboration & Contribution Guideline

### Code Style

The code style must be unified with the project. If `prettier` is effective in the project, the code will be automatically formatted to the unified format defined in `.preitterrc`.

### Commit Message

The commit message must be in the following format:

```
<type>(<scope>): <short summary>
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

The type must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests

## Additional Information

This project is based on Midway Node.js Framework. To learn Midway, check out the [Midway documentation](https://www.midwayjs.org).

The project's object–relational mapping (ORM) is based on TypeORM. To learn TypeORM, check out the [TypeORM documentation](https://typeorm.io).

To learn how TypeORM works with Midway, check out [TypeORM](https://www.midwayjs.org/docs/extensions/orm) in the Midway documentation.
