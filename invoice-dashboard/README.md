# Invoice dashboard

This project is being built with [TypeScript](https://www.typescriptlang.org/), [React](https://reactjs.org/) and [Vite](https://vitejs.dev/). I used [Chakra UI](https://chakra-ui.com/) as my prefered way of styling this applikation.

## Pre-requisites

Before you proceed to install, you need to have the following tools installed:

- [Node](https://nodejs.org/en/)

## How to install

In order to install you need to run:

```
npm install
```

and:

```
npm install -g json-server
```

## How to run project locally

To setup local development server, run:

```
npm run dev
```

To setup global JSON server, run:

```
json-server src/data/db.json -m ./node_modules/json-server-auth -r src/data/routes.json
```

## How to sign in

Email: olivier@mail.com
Password: bestPassw0rd

Remember: Access token expires after 1 hour

## How to build production bundle

To build the webpage for production, run:

```
npm run build
```

## Other available Scripts

```
npm run preview
```
