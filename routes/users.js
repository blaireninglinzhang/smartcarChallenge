// DEFINE ALL ROUTES HERE

const express = require('express');
const router = express.Router();
const request = require('request');


function callback(err, res, body) {
    if (err) {
        console.log(err);
    }
    // handle errors PROPERLY
    console.log('inside callback');
    console.log(body);
};

// this GET request is actually a POST for the gm server
router.get('/:id([0-9]+)', function (req, res, next) {
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/getVehicleInfoService',
        method: 'POST',
        json: true,
        body: {
            "id": id,
            "responseType": "JSON"
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }, callback);
    // handle errors
    res.send(req.params);
    res.send('ALL GOOD');
});






module.exports = router;