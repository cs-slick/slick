const mocha = require('mocha');
const expect = require('chai').expect;
const server = require('../server');
const request = require('supertest')(server);



describe('Server Routes Testing', function() {
  it('should server index html on GET request to /', function(done) {
    request
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('sending JSON object to client on GET request /songQueue', function(done) {
    // {artist,songName,thumbnailUrl, htmlString}
    request
      .get('/songQueue')
      .expect('Content-Type', /json/)
      .expect(function(res) {
          const jsonData = res.body[0];
          if (!('artist' in jsonData)) throw new Error("missing artist property");
          if (!('songName' in jsonData)) throw new Error("missing songName property");
          if (!('thumbnailUrl' in jsonData)) throw new Error("missing thumbnailUrl property");
          if (!('embedHtml' in jsonData)) throw new Error("missing embedHtml property");
      })
      .end(done);
  });


});
