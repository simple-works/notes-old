# Check out [:notebook: Amb-Notes-NEW](https://github.com/Ambratolm/amb-notes) for a better code redesign and real backend !

# :notebook: Amb-Notes-Old

> Public notes sharing web application. [**View Demo**](https://amb-notes-old.herokuapp.com)

![amb-notes-screenshot](/screenshot.gif?raw=true "Screenshot of the app")

## Table of contents

<!-- toc -->

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Technologies](#technologies)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Features](#features)
  - [Authentication](#authentication)
  - [Notes Feed](#notes-feed)
  - [User Profile](#user-profile)
  - [Administration](#administration)
- [Data Models](#data-models)
  - [User](#user)
  - [Note](#note)

<!-- tocstop -->

## Introduction

1. **What is this ?**

This is a simple VueJS app where users can register and login to post public notes that are shown in the homepage feed.

2. **What is it for ?**

This project can be used for learning purposes or as a starter template for building similar applications.

## Getting started

1. Clone the repo and Install the dependencies:

```bash
cd [somewhere]
git clone https://github.com/Ambratolm/amb-notes.git
cd amb-notes
npm i
```

2. Install **JSON Server Auth** globally:

```bash
npm i -g json-server-auth
```

3. In **package.json** file, Go to `scripts`. In `serve` and `serve-db` scripts, Change the `host` and `port` to your likings. You can replace `app.ambratolm.com` and `db.ambratolm.com` with `localhost` or any localhost aliases you have defined in your system.

```json
  "scripts": {
    "serve": "vue-cli-service serve --open --host=app.ambratolm.com --port=2020",
    "serve-db": "json-server-auth db/db.js --routes=db/routes.json --watch --delay=2000 --host=db.ambratolm.com --port=2021"
  }
```

4. Run the app server:

```bash
npm run serve
```

5. Run the _fake_ database server:

```bash
npm run serve-db
```

## Deployment

To deploy the project in a node environment:

1. Push the repo to a node server using a service like [Heroku](https://heroku.com).

2. Install the dependencies:

```bash
npm i
```

3. Build the app:

```bash
npm run build
```

7. Start the app:

```bash
npm start
```

You can also do the same to deploy locally.

If you want to start the app and watch for changes in **server.js** file, install **nodemon** globally:

```bash
npm i -g nodemon
```

then start the app with monitoring mode:

```bash
npm run start-m
```

## Technologies

The initial project was generated using [**Vue CLI**](https://github.com/vuejs/vue-cli) tool.

### Frontend

This app is mainly powered by:

- [**VueJS**](https://github.com/vuejs/vue) (JS framework) with its integrated packages: - [**Vue Router**](https://github.com/vuejs/vue-router) (For routing) - [**Vuex**](https://github.com/vuejs/vuex) (For centralized state management)

The app **GUI** is powered by:

- [**Bulma**](https://github.com/jgthms/bulma) (CSS framework)
- [**Buefy**](https://github.com/buefy/buefy) (Vue UI Bulma components)
- [**Bulmaswatch**](https://github.com/jenil/bulmaswatch) (Bulma themes)
- [**FontAwesome**](https://github.com/FortAwesome/Font-Awesome) (Icons used through Buefy)
- [**AnimateCSS**](https://github.com/daneden/animate.css) (CSS animations)

The app is using these **utilities**:

- [**Axios**](https://github.com/axios/axios) (For AJAX calls)
- [**Vue Meta**](https://github.com/nuxt/vue-meta) (For adding HTML metadata)
- [**Moment**](https://github.com/moment/moment/)/[**Vue Moment**](https://github.com/brockpetrie/vue-moment) (For formatting dates)
- [**VeeValidate**](https://github.com/logaretm/vee-validate) (For form validation)
- [**VuexPersist**](https://github.com/championswimmer/vuex-persist) (For data persistence)
- [**Lodash**](https://github.com/lodash/lodash) (For common tasks, especially array related)

### Backend

_No real backend used for the moment._

The backend **API** and **Data** are **similated** using:

- [**JSON Server**](https://github.com/typicode/json-server)/[**JSON Server Auth**](https://github.com/jeremyben/json-server-auth) (JSON-based API backend simulator)
- [**Faker**](https://github.com/marak/Faker.js) (Fake data generator)

For deploying the [**demo**](https://amb-notes.herokuapp.com), a node server was created using:

- [**Express**](https://github.com/expressjs/express) (Node framework) with the [**serve-static**](https://github.com/expressjs/serve-static) module (For serving app files)

## Features

### Authentication

- [x] As visitor you can register
- [x] As visitor you can login and logout
- [x] As user you can edit your account data

### Notes Feed

- [x] As visitor you can view all notes
- [x] As user you can post, edit and remove a note

### User Profile

- [x] As user you have a profile page that shows all of your notes
- [x] As user you can view other users profile pages
- [x] As user you can edit your profile page

## Data Models

### User

| Name            | Type | Rules                                        |
| :-------------- | :--- | :------------------------------------------- |
| **id**          | text | **[ primary-key ]**                          |
| **email**       | text | **[ required ][ unique ] [ format: email ]** |
| **password**    | text | **[ required ][ length: 8-80 ]**             |
| **name**        | text | **[ required ][ length: 3-30 ]**             |
| **description** | text | **[ length: 0-100 ]**                        |
| **avatar**      | text | **[ format: url ]**                          |
| **role**        | text | **[ values: "", "admin" ]**                  |

### Note

| Name        | Type | Rules                             |
| :---------- | :--- | :-------------------------------- |
| **id**      | text | **[ primary-key ]**               |
| **userId**  | text | **[ foreign-key: user ]**         |
| **date**    | text | **[ format: datetime ]**          |
| **title**   | text | **[required][ length: 3-30 ]**    |
| **content** | text | **[required][ length: 10-1000 ]** |

##
