const supertest = require('supertest');
const chai = require('chai'), 
    expect = chai.expect,
    should = chai.should();

const app = require('../app');

// GET VEHICLE INFO *PASS* CASE
describe('GET /vehicles/:id', () => {
    it('returns vehicle info successfully', done => {
        supertest(app)
            .get('/vehicles/1234')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.all.keys('vin', 'color', 'doorCount', 'driveTrain')
                expect(typeof res.body.doorCount).to.equal('number')
                done();
            });
        });
});

// GET VEHICLE INFO *FAIL* CASE
describe('GET /vehicles/:id', () => {
    it('returns error and error message for get vehicle info', done => {
        supertest(app)
            .get('/vehicles/12')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.all.keys('error', 'message')
                done();
            });
        });
});

// GET SECURITY STATUS *PASS* CASE 
describe('GET /vehicles/:id/doors', () => {
    it('returns security status successfully', done => {
        supertest(app)
            .get('/vehicles/1234/doors')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.be.an('array')
                res.body.every(item => expect(item).to.have.all.keys('location', 'locked'))
                res.body.every(item => expect(typeof item.locked).to.equal('boolean'))
                done();
            });
        });
});

// GET SECURITY STATUS *FAIL* CASE
describe('GET /vehicles/:id/doors', () => {
    it('returns error and error message for get security status', done => {
        supertest(app)
            .get('/vehicles/34/doors')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.all.keys('error', 'message')
                done();
            });
        });
});

// GET FUEL RANGE *PASS* CASE 
describe('GET /vehicles/:id/fuel', () => {
    it('returns fuel range successfully', done => {
        supertest(app)
            .get('/vehicles/1234/fuel')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.property('percent')
                if (typeof res.body.percent !== 'number'){
                    expect(typeof res.body.percent).to.equal('object')
                }
                done();
            });
        });
});

// GET FUEL RANGE *FAIL* CASE 
describe('GET /vehicles/:id/fuel', () => {
    it('returns error and error message for get fuel range', done => {
        supertest(app)
            .get('/vehicles/23/fuel')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.all.keys('error', 'message')
                done();
            });
        });
});

// GET BATTERY RANGE *PASS* CASE 
describe('GET /vehicles/:id/battery', () => {
    it('returns battery range successfully', done => {
        supertest(app)
            .get('/vehicles/1234/battery')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.property('percent')
                if (typeof res.body.percent !== 'number'){
                    expect(typeof res.body.percent).to.equal('object')
                }
                done();
            });
        });
});

// GET BATTERY RANGE *FAIL* CASE 
describe('GET /vehicles/:id/fuel', () => {
    it('returns error and error message for get battery range', done => {
        supertest(app)
            .get('/vehicles/000/battery')
            .set('Accept', 'application/json')
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.all.keys('error', 'message')
                done();
            });
        });
});

// POST ENGINE ACTION *PASS* CASE 
describe('POST /vehicles/:id/engine', () => {
    it('returns engine action successfully', done => {
        supertest(app)
            .post('/vehicles/1234/engine')
            .set('Accept', 'application/json')
            .send({action: 'START'})
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.property('status')
                done();
            });
        });
});

// POST ENGINE ACTION *FAIL* CASE 
describe('POST /vehicles/:id/engine', () => {
    it('returns error and error message for post engine action', done => {
        supertest(app)
            .post('/vehicles/222/engine')
            .set('Accept', 'application/json')
            .send({action: 'START'})
            .end( (err, res) => {
                if (err) return done(err);
                expect(err).to.be.null
                expect(res.body).to.have.all.keys('error', 'message')
                done();
            });
        });
});