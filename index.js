const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.get('/', (req, res) => res.send('Getting Started!'));

app.listen(3000, () => console.log('listening on port 3000!'));