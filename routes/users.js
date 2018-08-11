'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');

/** 
 * Make requests to the GM server and send back parsed responses here
 * Using Express Router, define routes for: 
 * GET /vehicles/:id
 * GET /vehicles/:id/doors
 * GET /vehicles/:id/fuel
 * GET /vehicles/:id/battery
 * POST /vehicles/:id/engine
 */

router.get('/vehicles/:id', (req, res) => {
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/getVehicleInfoService',
        json: true,
        body: { id: id, responseType: 'JSON' },
        headers: { 'Content-Type': 'application/json' }
    }, (err, requestResponse, body) => {
        if (err) { console.log('an error occurred: ' + err); }
        const requestStatus = body.status;
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

router.get('/vehicles/:id/doors', (req, res) => {
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/getSecurityStatusService',
        json: true,
        body: { id: id, responseType: 'JSON' },
        headers: { 'Content-Type': 'application/json' }
    }, (err, requestResponse, body) => {
        if (err) { console.log('an error occurred: ' + err); }
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

router.get('/vehicles/:id/fuel', (req, res) => {
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/getEnergyService',
        json: true,
        body: { id: id, responseType: 'JSON' },
        headers: { 'Content-Type': 'application/json' }
    }, (err, requestResponse, body) => {
        if (err) { console.log('an error occurred: ' + err); }
        const requestStatus = body.status;
        if (requestStatus != 200) {
            res.json({
                error: requestStatus,
                message: requestResponse.body.reason || ''
            });
        } else {
            const percent = body.data.tankLevel.value;
            res.json({
                percent: parseFloat(percent)
            });
            res.end();
        }
    });
});

router.get('/vehicles/:id/battery', (req, res) => {
    const id = req.params.id;
    request.post({
        url: 'http://gmapi.azurewebsites.net/getEnergyService',
        json: true,
        body: { id: id, responseType: 'JSON' },
        headers: { 'Content-Type': 'application/json' }
    }, (err, requestResponse, body) => {
        if (err) { console.log('an error occurred: ' + err); }
        const requestStatus = body.status;
        if (requestStatus != 200) {
            res.json({
                error: requestStatus,
                message: requestResponse.body.reason || ''
            });
        } else {
            const percent = body.data.batteryLevel.value;
            res.json({
                percent: parseFloat(percent)
            });
            res.end();
        }
    });
});

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
        if (err) { console.log('an error occurred: ' + err); }
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