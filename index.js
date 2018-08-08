const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express(); 

bp = bodyParser.json({ type: 'application/json' });
app.use(bp);

module.exports = app;

// const gm_url = 'http://gmapi.azurewebsites.net'; 


app.get('/', (req, res) => res.send('Getting Started!'));


// just testing the gm api, get vehicle info
const jsonBody = {
  "id": "1234",
  "responseType": "JSON"
};

const options = {
	url: 'http://gmapi.azurewebsites.net/getVehicleInfoService',
	method: 'POST',
	json: true,
	body: jsonBody,
	headers: {
		'Content-Type': 'application/json'
	}
};

function callback(err, res, body) {
	if (err) {
		console.log(err);
	}
	console.log('inside callback');
	console.log(res);
	console.log(body);
};

request(options, callback);



app.listen(3000, () => console.log('listening on port 3000!'));


