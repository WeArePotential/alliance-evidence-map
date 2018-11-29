# Alliance Evidence Map

The evidence map is built using [Vue.js](https://vuejs.org/) (using [Vue CLI](https://cli.vuejs.org/)).

## Installation

Make sure you've [Node](https://nodejs.org/en/) installed.

Clone this repo, navigate to app directory and run:

`npm install`

To start the app run:

`npm run serve`

## Architecture

The entry point is `main.js` and the main application code is in `App.vue`. Components for the sidebar, table, charts etc. are in `components`.

CSS styling is in the individual components e.g. the sidebar styling is at the bottom of `components/Sidebar.vue`

## Build

Build the app for production using `npm run build` which updates the `dist` directory. Upload the `dist` directory to your web server.
