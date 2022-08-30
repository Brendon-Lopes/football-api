### Select a language: English, [Português](./README-pt.md).

<br/>

# ⚽ Project Football API ⚽

A football API where you can get info about matches, and teams leaderboards.

A project made to practice creating RESTful APIs, using TypeScript and Sequelize with MySQL. Using mostly OOP.

Integration tests for the backend were made using Mocha, Chai and Sinon.

There's user validation using JWT (JSON Web Token). (A token is necessary to create new matches).

A Front-end is also available (made by Trybe).
The Back-end was made by me.

<br/>

# Technologies used

Docker, TypeScript, Express, Sequelize, MySQL, BCrypt, JWT, JOI, Mocha, Chai, Sinon...

<br/>

# Usage

<details>
  <summary><strong>Cloning the repository and installing dependencies</strong></summary>

- `git clone git@github.com:Brendon-Lopes/football-api.git`
- `cd football-api`
- `npm run install:apps`

</details>

<details>
  <summary><strong>Running the apps</strong></summary>

- `npm run compose:up`
  - to start application (front and back) using docker compose.
- Front-end can be accessed on: http://localhost:3000
- Back-end runs here: http://localhost:3001

</details>

<details>
  <summary><strong>Logging in</strong></summary>

- Login info with admin powers (for testing purposes).
  - email: `admin@admin.com`
  - password: `secret_admin`

</details>

<details>
  <summary><strong>Running tests</strong></summary>

- `npm run test:api`
  - to run the back-end's integration tests

</details>

<br/>

# Final considerations

This was my first project using Sequelize with TypeScript, it was really fun to do and I learnt a lot on the process. It helped me consolidate my Docker skills, my TypeScript skills (including tests with TS), making interfaces and classes while trying my best to follow the SOLID principles and having a clean code.
