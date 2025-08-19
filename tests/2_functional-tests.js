const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Convert a valid input such as 10L: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({ input: '10L' })
            .end((err, res) => {
                assert.equal(res.status, 200);

                assert.containsAllKeys(res.body, [
                    'initNum',
                    'initUnit',
                    'returnNum',
                    'returnUnit',
                    'string',
                ]);

                assert.strictEqual(res.body.initNum, 10);

                assert.match(res.body.initUnit, /^l$/i);

                assert.match(res.body.returnUnit, /^gal$/i);

                const expected = 10 / 3.78541;
                assert.approximately(res.body.returnNum, expected, 0.0001);

                assert.isString(res.body.string);
                assert.match(res.body.string, /converts to/i);

                done();
            });
    });
    test('Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({ input: '32g' })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.match(res.body.error, /invalid unit/i);
                done();
            });
    });
    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kg' })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.match(res.body.error, /invalid number/i);
                done();
            });
    });
    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kg' })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.match(res.body.error, /invalid number/i);
                done();
            });
    });
    test('Convert with no number such as kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({ input: 'kg' })
            .end((err, res) => {
                assert.equal(res.status, 200);

                assert.containsAllKeys(res.body, [
                    'initNum',
                    'initUnit',
                    'returnNum',
                    'returnUnit',
                    'string',
                ]);

                assert.strictEqual(res.body.initNum, 1);

                assert.match(res.body.initUnit, /^kg$/i);

                assert.match(res.body.returnUnit, /^lbs$/i);

                const expected = 2.20462;
                assert.approximately(res.body.returnNum, expected, 0.0001);

                assert.isString(res.body.string);
                assert.match(res.body.string, /converts to/i);

                done();
            });
    });
});
