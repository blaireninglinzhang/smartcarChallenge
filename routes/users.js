const express = require('express');
const router = express.Router();
const request = require('request');

// 1.
router.get('/vehicles/:id', function(req, res) {
    console.log('inside smartcar GET vehicle info');
    const id = req.params.id;
    request.post({
        url: "http://gmapi.azurewebsites.net/getVehicleInfoService",
        json: true,
        body: {
            id: id,
            responseType: 'JSON'
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }, (err, requestResponse, body) => {
        if (err) {
            console.log('an error occurred: ' + err);
        }
        console.log('inside vehicleInfo_cb');
        console.log('the actual status code is: ' + requestResponse.body.status);
        console.log('the fake status code is: ' + requestResponse.statusCode); // one that we cannot trust
        console.log('the error message is: ' + requestResponse.body.reason); 

        if (body.status !== '200') { // handle bad requests
            console.log('unsuccessful request');
            res.json({
                error: requestResponse.body.status,
                message: requestResponse.body.reason
            });
        } else {
            console.log('request successful')
            res.json({
                vin: body.data.vin.value,
                color: body.data.color.value,
                doorCount: body.data.fourDoorSedan.value === 'True' ? 4 : 2,
                driveTrain: body.data.driveTrain.value
            });
            res.end();
        }
    });
});

// 2. 
router.get('/vehicles/:id/doors', function(req, res) {
    console.log('inside smartcar GET security status');
    const id = req.params.id;
    request.post({
        url: "http://gmapi.azurewebsites.net/getSecurityStatusService",
        json: true,
        body: {
            id: id,
            responseType: 'JSON'
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }, (err, requestResponse, body) => {
        if (err) {
            console.log('an error occurred: ' + err);
        }
        console.log('inside vehicleInfo_cb');
        console.log('the actual status code is: ' + requestResponse.body.status);
        console.log('the fake status code is: ' + requestResponse.statusCode); // one that we cannot trust
        console.log('the error message is: ' + requestResponse.body.reason); 

        if (body.status !== '200') { // handle bad requests
            console.log('unsuccessful request');
            res.json({
                error: requestResponse.body.status,
                message: requestResponse.body.reason
            });
        } else {
            console.log('successful request');
            res.json({
                vin: body.data.vin.value,
                color: body.data.color.value,
                doorCount: body.data.fourDoorSedan.value === 'True' ? 4 : 2,
                driveTrain: body.data.driveTrain.value
            });
            res.end();
        }
    });
});





module.exports = router;