### Select a language: [English](https://github.com/Brendon-Lopes/football-api), Português.

<br/>

# ⚽ Projeto API de Futebol ⚽

Uma API de Futebol, onde você pode buscar informações sobre partidas e tabelas do campeonato.

Um projeto feio para praticar a criação de APIs RESTful, usando TypeScript e Sequelize com MySQL. Usando prioritariamente POO.

Os testes de integração feitos para o backend foram feitos usando Mocha, Chai e Sinon.

Existe validação de usuário usando JWT (JSON Web Token). (Um token é necessário pra criar novas partidas).

Um Front-end também está disponível (feito pela Trybe).
O Back-end foi feito por mim.

<br/>

# Tecnologias usadas

Docker, TypeScript, Express, Sequelize, MySQL, BCrypt, JWT, JOI, Mocha, Chai, Sinon...

<br/>

# Como usar

<details>
  <summary><strong>Clonando o repositório e instalando as dependências</strong></summary>

- `git clone git@github.com:Brendon-Lopes/football-api.git`
- `cd football-api`
- `npm run install:apps`

</details>

<details>
  <summary><strong>Rodando os aplicativos</strong></summary>

- `npm run compose:up`
  - pra começar a aplicação, (front e back) usando docker compose.
- O Front-end pode ser acessado aqui: http://localhost:3000
- O Back-end roda aqui: http://localhost:3001

</details>

<details>
  <summary><strong>Logando</strong></summary>

- Credenciais de login com poderes de admin (para propósitos de teste).
  - email: `admin@admin.com`
  - senha: `secret_admin`

</details>

<details>
  <summary><strong>Rodando testes</strong></summary>

- `npm run test:api`
  - para rodar os testes de integração do Back-end.

</details>

<br/>

# Considerações finais

Esse foi o meu primeiro projeto usando Sequelize com TypeScript, foi muito divertido fazê-lo e aprendi muito no processo. Me ajudou a consolidar minhas habilidades com Docker, TypeScript (incluindo testes com TS), fazer interfaces e classes enquanto tentei ao máximo seguir os princípios SOLID e ter um código limpo.
