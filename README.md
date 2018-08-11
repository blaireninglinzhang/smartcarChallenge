# Smartcar Backend Coding Challenge

Submission for the Smartcar Backend Coding Challenge

The 
The Generic Motors (GM) car company has a terrible API. It returns badly structured JSON which isn't always consistent. Smartcar needs to adapt the API into a cleaner format.


## Getting Started

Server running locally at http://localhost:3000

```
git clone git@github.com:blaireninglinzhang/smartcarChallenge.git
cd smartcarChallenge
```

### Prerequisites

[Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/)

### Installing

To install dependencies:

```
npm install
```
OR

```
yarn add
```

## Running the tests

This project uses:

[Mocha](https://github.com/mochajs/mocha) as a testing framework and 
[Chai](https://github.com/chaijs/chai) as an assertion library

This project uses the Chai's `expect` library to test against the api calls

To run tests:

```
npm test
```
OR

```
yarn test
```

## Notes

Use [Postman](https://www.getpostman.com/) to test endpoints. Run `node app.js` first. 

Mocha might get stuck running the first time, `Ctrl+C` and run again. All 10 tests should be passing.