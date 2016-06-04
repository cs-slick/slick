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
          res.body.artist = 'Kanye';
          res.body.songName = 'Famous';
          res.body.thumbnailUrl = 'http://kanyethegod.com';
          res.body.embedHtml = 'this is html string';
      })
      .expect(200, {
        artist: 'Kanye',
        songName: 'Famous',
        thumbnailUrl: 'http://kanyethegod.com',
        embedHtml: 'this is html string',
      })
      .end(done);
  });


});
