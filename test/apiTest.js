const request = require('supertest');
const app = require('../app');


// testing get vehicle info user endpoint 
describe('GET /vehicles/:id', function () {
    it('return vehicle info', function (done) {
        request(app)
            .get('/vehicles/1234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done) // expecting successful request
    });
});

describe('GET /vehicles/:id', function () {
    it('respond with 404 not found', function (done) {
        request(app)
            .get('/vehicles/1111')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) // expecting not found
            .end((err) => {
                if (err) return done(err);
                done();
            }); 
    });
});