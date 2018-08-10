const supertest = require('supertest');
const chai = require('chai'), 
    expect = chai.expect,
    should = chai.should();

const app = require('../app');

// GET VEHICLE INFO *PASS* CASE
describe('GET /vehicles/:id', () => {
    it('return 200 response with vehicle info', done => {
        supertest(app)
            .get('/vehicles/1234')
            .set('Accept', 'application/json')
            .expect(200) // gm always spits 200
            .end( (err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.all.keys('vin', 'color', 'doorCount', 'driveTrain')
                done();
            });
        });
});

// GET VEHICLE INFO *FAIL* CASE
describe('GET /vehicles/:id', () => {
    it('return error and error message with no vehicle info found', done => {
        supertest(app)
            .get('/vehicles/12')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.all.keys('error', 'message')
                done();
            });
        });
});

// GET SECURITY STATUS *PASS* CASE 
describe('GET /vehicles/:id/doors', () => {
    it('return 200 response with security info', done => {
        supertest(app)
            .get('/vehicles/1234/doors')
            .set('Accept', 'application/json')
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array')
                res.body.every(item => expect(item).to.have.all.keys('location', 'locked'))
                done();
            });
        });
});

// GET SECURITY STATUS *FAIL* CASE
describe('GET /vehicles/:id/doors', () => {
    it('return error and error message with no security info found', done => {
        supertest(app)
            .get('/vehicles/34/doors')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.all.keys('error', 'message')
                done();
            });
        });
});


