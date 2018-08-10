const supertest = require('supertest');
const chai = require('chai'), 
    expect = chai.expect,
    should = chai.should();

const app = require('../app');

// GET VEHICLE INFO PASS CASE
describe('GET /vehicles/:id', function () {
    it('return 200 response with vehicle info', function (done) {
        supertest(app)
            .get('/vehicles/1234')
            .set('Accept', 'application/json')
            .expect(200) // gm always spits 200
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property("vin");
                res.body.should.have.property("color");
                res.body.should.have.property("doorCount");
                res.body.should.have.property("driveTrain");
                done();
            });
        });
});


// GET VEHICLE INFO FAIL CASE
describe('GET /vehicles/:id', function () {
    it('return error and error message with no vehicle info', function (done) {
        supertest(app)
            .get('/vehicles/12')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property("error"); // error contains actual error code
                res.body.should.have.property("message");
                done();
            });
        });
});
