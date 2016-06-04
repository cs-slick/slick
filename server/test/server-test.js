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
          const jsonDataArr = res.body;
          jsonDataArr.forEach(songData => {
            if (!('artist' in songData)) throw new Error("missing artist property");
            if (!('songName' in songData)) throw new Error("missing songName property");
            if (!('thumbnailUrl' in songData)) throw new Error("missing thumbnailUrl property");
            if (!('embedHtml' in songData)) throw new Error("missing embedHtml property");
          });
      })
      .end(done);
  });


});
