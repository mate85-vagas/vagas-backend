# How to run

Make sure to have all dependencies installed before run the project, you can use `npm install` to do that.

Since you have all the dependencies, you can run the project by using `npx nodemon src/index` on your console, in vagas-backend dir.

p.s.: Make sure to have a MySQL database named vagas_db running and all the environment variables set.
<!---
# API endpoints

These endpoints will be used to consult, analyze and update informations on the application in IC's jobs base
--->
# Code formatting setup

Download prettier and eslint plugin in vscode.

Execute command: `ctrl + shift + P`

Now add: "editor.defaultFormatter": "esbenp.prettier-vscode", "editor.formatOnSave": true

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

- [:framed_picture: Layout](#framed_picture-layout)
- [:computer: Demo](#computer-demo)
- [:rocket: Technologies](#rocket-technologies)
- [:boom: How to run](#boom-how-to-run)
    - [Prerequisites](#prerequisites)
    - [Setting environment variables](#setting-environment-variables)
    - [Running the application](#running-the-application)
- [:wrench: Environment variables](#wrench-environment-variables)
- [:recycle: How to contribute](#recycle-how-to-contribute)
- [:memo: License](#memo-license)


<a id="layout"></a>

## :framed_picture: Layout

The layout prototype of this application is available on [Figma](https://www.figma.com/file/Z6loIYv1xVtCgkyf3BzHp3/MATE85---Grupo-3?node-id=0%3A1).

<a id="demo"></a>

## :computer: Demo

This application was hosted by [Heroku](https://www.heroku.com/) e can be found here: [Talentos IC](https://talentosic-vagas.herokuapp.com/).

<a id="tecnologias"></a>

## :rocket: Technologies

This application uses this following technologies:

- [ReactJS](https://reactjs.org/)
- [ESLint](https://eslint.org/) (Code standardization)
- [Prettier](https://prettier.io/) (Code formatting)
- [React Router](https://reactrouter.com/web/guides/quick-start)

<a id="como-executar"></a>

## :boom: How to run

#### Prerequisites

To run this application, you need to have it on your machine:

- [NodeJS](https://nodejs.org/en/download/)


#### Setting environment variables
```sh
# Copy .env from .env.example to setup environment variables
$ cp .env.example .env
```

#### Running the application

```sh
# Clone this repository
$ git clone https://github.com/mate85-vagas/vagas-frontend

# Move to root directory
$ cd vagas-frontend

# Install dependencies
$ npm install

# Run on a local server
$ npm start
```

#### Running the tests

```sh
# Searches and runs all tests
$ npm test
```

<a id="variaveis-ambiente"></a>

## :wrench: Environment variables

| Name          | Description     | Default               |
| -             | -               | -                     |
| REACT_APP_API | URL of the API  | http://localhost:5000 |

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
