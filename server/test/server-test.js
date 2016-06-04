const mocha = require('mocha');
const expect = require('chai').expect;
const should = require('chai').should();
const server = require('../server');
const request = require('supertest')(server);
const io = require('socket.io-client');
const io_server = require('./mock-server');

var socketURL = 'http://localhost:5000';

const options = {
  transports: ['websocket'],
  'force new connection': true,
}

var chatUser1 = {'name': 'Mike'};
var chatUser2 = {'name': 'Brendan'};

describe('Server Routes Testing', function() {
  it('should server index html on GET request to /', function(done) {
    request
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should respond to GET request to /songQueue with status code 200', function(done) {
    request
    .get('/songQueue')
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
            if (!('trackUrl' in songData)) throw new Error("missing trackUrl property");
          });
      })
      .end(done);
  });

  describe("Chat Server",function(){

    /* Test 1 - A Single User */
    it('Should broadcast new user once they connect',function(done){
      var client = io.connect(socketURL, options);

      client.on('connect',function(data){
        client.emit('connection name',chatUser1);
      });

      client.on('new user',function(usersName){
        usersName.should.be.a('string');
        usersName.should.equal(chatUser1.name + " has joined.");
        /* If this client doesn't disconnect it will interfere
        with the next test */
        client.disconnect();
        done();
      });
    });

    /* Test 2 - Two Users */
    it('Should broadcast new user to all users', function(done){
      var client1 = io.connect(socketURL, options);

      client1.on('connect', function(data){
        client1.emit('connection name', chatUser1);

        /* Since first client is connected, we connect
        the second client. */
        var client2 = io.connect(socketURL, options);

        client2.on('connect', function(data){
          client2.emit('connection name', chatUser2);
        });

        client2.on('new user', function(usersName){
          usersName.should.equal(chatUser2.name + " has joined.");
          client2.disconnect();
        });

      });

      var numUsers = 0;
      client1.on('new user', function(usersName){
        numUsers += 1;

        if(numUsers === 2){
          usersName.should.equal(chatUser2.name + " has joined.");
          client1.disconnect();
          done();
        }
      });
    });
  });
});
