// DEFINE ALL ROUTES HERE
const express = require('express');
const router = express.Router();
const request = require('request');


function callback(err, res, body) {
    if (err) {
        console.log(err);
    }
    // handle errors PROPERLY AND GRACEFULLY
    console.log('inside callback');
    console.log(body);
    console.log(res.status);
    console.log(body.status);
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
    console.log(req.params);
    console.log('ALL GOOD');
    //next();
});






module.exports = router;