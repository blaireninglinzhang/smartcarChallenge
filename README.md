# Smartcar Backend Coding Challenge

Submission for the Smartcar Backend Coding Challenge

The Generic Motors (GM) car company has a terrible API. It returns badly structured JSON which isn't always consistent. Smartcar needs to adapt the API into a cleaner format.

## Getting Started

To clone repository: 

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

See `package.json` for details

## Running the tests

This project uses:

[Mocha](https://github.com/mochajs/mocha) as a testing framework and [Chai](https://github.com/chaijs/chai) as an assertion library. Chai's `expect` library is used to test against api calls.

To run tests using Mocha: 

```
npm test
```

## Notes

* Use [Postman](https://www.getpostman.com/) to validate endpoints. Run `node app.js` first. 

* Mocha might get stuck running the first time, `ctrl+C` and run again. All 12 tests should be passing.