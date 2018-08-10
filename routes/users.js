const express = require('express');
const router = express.Router();
const request = require('request');

// GET VEHICLE INFO
router.get('/vehicles/:id', (req, res) => {
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
        if (body.status !== '200') {
            console.log('request was unsuccessful');
            res.json({
                error: requestResponse.body.status,
                message: requestResponse.body.reason
            });
        } else {
            console.log('request was successful')
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

// GET SECURITY STATUS
router.get('/vehicles/:id/doors', (req, res) => {
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
        if (body.status !== '200') {
            console.log('request was unsuccessful');
            res.json({
                error: requestResponse.body.status,
                message: requestResponse.body.reason
            });
        } else {
            console.log('request was successful');
            const items = body.data.doors.values;
            const result = items.map( ({ location, locked }) => ({
                location: location.value, 
                locked: locked.value.toLowerCase() === 'true'
            }));
            res.json(result);
            res.end();
        }
    });
});





module.exports = router;