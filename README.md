<!-- Logo -->

<h1 align="center" style="font-family: Ubuntu; font-size: 45px; color: #333; margin-bottom: 0">
  Talentos IC - REST API
</h1>

<!-- Description -->

<h4 align="center">
	UFBA - Instituto de Computação - MATE85 - 2022.1 - Grupo 3
</h4>

<!-- Summary -->

<h2>Summary</h2>

- [:page_with_curl: Deployment Document](#page_with_curl-deployment-document)
- [:computer: API Documentation](#computer-api-documentation)
- [:rocket: Technologies](#rocket-technologies)
- [:boom: How to run](#boom-how-to-run)
    - [Prerequisites](#prerequisites)
    - [Setting environment variables](#setting-environment-variables)
    - [Running the application](#running-the-application)
- [:sparkles: Code formatting setup](#sparkles-code-formatting-setup)
- [:recycle: How to contribute](#recycle-how-to-contribute)
- [:memo: License](#memo-license)

<a id="doc-implant"></a>

## :page_with_curl: Deployment Document

The deployment document can be found on this [link](https://docs.google.com/document/d/1-MTmP5WswbvFB25XE1YlzXn-FZ0LhCXj2cAWlHahfpg/edit?usp=sharing).

<a id="doc"></a>

## :computer: API Documentation

This application is documented on [Swagger](https://swagger.io//) and can be found here: [Talentos IC - Swagger](https://vagas-ic.herokuapp.com/api-doc/v1/).

<a id="tecnologias"></a>

## :rocket: Technologies

This application uses this following technologies:

- [Express](https://expressjs.com/pt-br/)
- [Sequelize](https://sequelize.org/)
- [ESLint](https://eslint.org/) (Code standardization)
- [Prettier](https://prettier.io/) (Code formatting)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Jwt](https://www.npmjs.com/package/jsonwebtoken)
- [Cors](https://www.npmjs.com/package/cors)

<a id="como-executar"></a>

## :boom: How to run

#### Prerequisites

To run this application, you need to have it on your machine:

- [NodeJS](https://nodejs.org/en/download/)


#### Setting environment variables

```sh
# Copy .env from .env.example to setup environment variables and set them
$ cp .env.example .env
```

#### Running the application

```sh
# Clone this repository
$ git clone https://github.com/mate85-vagas/vagas-backend

# Move to root directory
$ cd vagas-backend

# Install dependencies
$ npm install

# Run on a local server
$ npx nodemon src/index
```

##### Make sure to have a MySQL database named vagas_db running and all the environment variables set.

#### Running the tests

```sh
# Searches and runs all tests
$ npm test
```

---

<a id="code-format"></a>

## :sparkles: Code formatting setup

Download prettier and eslint plugin in vscode.

Execute command: `ctrl + shift + P`

Now add on vscode configurations:

```json
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true
```

---

<a id="como-contribuir"></a>

## :recycle: How to contribute

- Fork this repository
- Create a branch with the name of your feature: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'feat: My new feature'`
- Push your branch: `git push origin my-feature`

<a id="licenca"></a>

## :memo: License

To be defined...
