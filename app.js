const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/users');
const app = express();

// use these on every request
app.use(bodyParser.json());
app.use('/vehicles', router);

module.exports = app; 

app.listen(3000, () => console.log('listening on port 3000!'));