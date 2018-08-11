const express = require('express');
const router = express.Router();
const request = require('request');

// GET VEHICLE INFO
router.get('/vehicles/:id', (req, res) => {
    console.log('inside smartcar GET vehicle info');
    const id = req.params.id;
    // TODO: leave comment for smartcar --> refactor
    request.post({
        url: 'http://gmapi.azurewebsites.net/getVehicleInfoService',
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
        const requestStatus = body.status; // actual request status from body
        if (requestStatus != 200) {
            res.json({
                error: requestStatus,
                message: requestResponse.body.reason || ''
            });
        } else {
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
        url: 'http://gmapi.azurewebsites.net/getSecurityStatusService',
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
        const requestStatus = body.status;
        if (requestStatus != 200) {
            res.json({
                error: requestStatus,
                message: requestResponse.body.reason || ''
            });
        } else {
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

// GET FUEL RANGE
router.get('/vehicles/:id/fuel', (req, res) => {
    console.log('inside smartcar GET fuel range');
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/getEnergyService',
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
        const requestStatus = body.status;
        if (requestStatus != 200) {
            res.json({
                error: requestStatus,
                message: requestResponse.body.reason || ''
            });
        } else {
            const percent = body.data.tankLevel.value;
            res.json({percent: parseFloat(percent)});
            res.end();
        }
    });
});

// GET BATTERY RANGE
router.get('/vehicles/:id/battery', (req, res) => {
    console.log('inside smartcar GET battery range');
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/getEnergyService',
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
        const requestStatus = body.status;
        if (requestStatus != 200) {
            res.json({
                error: requestStatus,
                message: requestResponse.body.reason || ''
            });
        } else {
            const percent = body.data.batteryLevel.value;
            res.json({percent: parseFloat(percent)});
            res.end();
        }
    });
});

// POST START/STOP ENGINE
router.post('/vehicles/:id/engine', (req, res) => {
    const requestBody = req.body.action;
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/actionEngineService',
        json: true,
        body: {
            id: id,
            command: requestBody == 'START' ? 'START_VEHICLE' : 'STOP_VEHICLE',
            responseType: 'JSON'
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }, (err, requestResponse, body) => {
        if (err) {
            console.log('an error occurred: ' + err);
        }
        const requestStatus = body.status;
        if (requestStatus != 200) {
            res.json({
                error: requestStatus,
                message: requestResponse.body.reason || ''
            });
        } else {
            res.json({
                status: body.actionResult.status == 'EXECUTED' ? 'success' : 'error'
            });
            res.end();
        }
    });
});

module.exports = router;