const mocha = require('mocha');
const expect = require('chai').expect;
const server = require('../server');
const request = require('supertest')(server);

describe('Server Routes Testing', () => {
  it('should server index html on GET request to /', done => {
    request
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
