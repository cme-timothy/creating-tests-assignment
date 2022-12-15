# Time tracking app

This project is being built with [React](https://reactjs.org/) and [Create React App](https://create-react-app.dev/) as its starting template. I used [Chakra UI](https://chakra-ui.com/) as my prefered way of styling this applikation.

I built a functioning timer and calender without using external libraries. The calendar currently has no adjustments for leap days.

The application is optimised for phone browsers, specifically iPhone SE.

## NPM packets installed:

I used react helmet async for adding page descriptions. Fontawesome solid SVG icons for the applications header icons. UUID for creating unique component keys and Axios for more straightforward fetch requests.

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

To setup a local development server, run:

```
npm run start
```

To setup a local JSON server, run:

```
json-server --watch src/data/db.json --port 4000
```

## How to build a production bundle

To build the webpage for production, run:

```
npm run build
```

## Other available Scripts

```
npm run test
```

Launches the test runner in the interactive watch mode.

```
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
