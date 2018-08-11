'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/users');

app.use(bodyParser.json());
app.use('/', router);

module.exports = app; 

app.listen(3000, () => console.log('listening on port 3000!'));