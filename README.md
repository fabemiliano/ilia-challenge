# Pokedex

<img src="./pokedex.png"/>

This responsive application was built with modern React and a public [API](https://pokemontcg.io/).

A functional version of the app can be found here: http://ilia-challenge-fabiano.herokuapp.com/

This application is able to show a deck of cards based on the pokemon game. On small screens the deck is shown in carousel format and grid when opened on big screens.

It's possible to search a pokemon by name.

Upon clicking, the user is redirected to the details page where is shown some other information.

There will be a list of attacks which on clicking will show a modal containing information about the selected attack.

There is a button to return to the main page.

If the user types a address which doesn't exist it will be redirected to a Not Found page.

This application also supports multi language (english and portuguese);

To build this app, the following technologies were applied:

- React Router Dom: routing
- Redux: state manager
- FontAwesome: icons
- Axios: http client
- i18next: translation
- prop-types: typechecking
- Eslint: linter


For testing:
- Jest: unit tests
- React Testing Library: behavior test
- Cypress: E2E tests

In order to run locally, clone this repository:

```git clone https://github.com/fabemiliano/ilia-challenge.git```

Install the dependencies with ```npm install``` 
and run the application with ```npm start``` 