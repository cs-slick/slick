const mocha = require('mocha');
const expect = require('chai').expect;
const should = require('chai').should();
const server = require('../server');
const request = require('supertest');
const io = require('socket.io-client');
const io_server = require('./mock-server');

var socketURL = 'http://localhost:5000';

const options = {
  transports: ['websocket'],
  'force new connection': true,
}

var chatUser1 = {'user': 'Mike', 'action': 'play', 'data': 'kanyewest.mp3'};
var chatUser2 = {'user': 'Brendan', 'action': 'play', 'data': 'britneyspears.mp3'};

describe('Server Routes Testing', function() {
  it('should server index html on GET request to /', function(done) {
    request("http://localhost:3000")
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should respond to GET request to /songQueue with status code 200', function(done) {
    request("http://localhost:3000")
    .get('/songQueue')
    .expect(200, done);
  });

  it('sending JSON object to client on POST request /search', function(done) {
    var searchTerms = {artist: 'queen', title: 'we are the champions'};
    // {artist,songName,thumbnailUrl, htmlString}
    request("http://localhost:3000")
      .post('/search')
      .type('form')
      .send(searchTerms)
      .expect(function(res) {
        //console.log(res.text);
          const jsonDataArr = JSON.parse(res.text);
          jsonDataArr.forEach(songData => {
            if (!('artist' in songData)) throw new Error("missing artist property");
            if (!('artistImg' in songData)) throw new Error("missing artistImg property");
            if (!('album' in songData)) throw new Error("missing album property");
            if (!('albumImg' in songData)) throw new Error("missing albumImg property");
            if (!('title' in songData)) throw new Error("missing title property");
            if (!('description' in songData)) throw new Error("missing description property");
            if (!('videoId' in songData)) throw new Error("missing videoId property");
          });
      })
      .end(done);
  });

  describe("Socket Server",function(){

    /* Test 1 - A Single User */
    it('should have client emit playSong once they connect',function(done){
      var client = io.connect(socketURL, options);

      client.on('connect',function(data){
        client.emit('client connect',chatUser1.user);
      });

      client.on('playSong',function(data){
        data.should.have.property('user');
        data.should.have.property('action');
        data.should.have.property('data');
        client.disconnect();
        done();
      });
    });

    /* Test 2 - Two Users */
    // it('Should broadcast new user to all users', function(done){
    //   var client1 = io.connect(socketURL, options);
    //
    //   client1.on('connect', function(data){
    //     client1.emit('client connect', chatUser1.name);
    //
    //     /* Since first client is connected, we connect
    //     the second client. */
    //     var client2 = io.connect(socketURL, options);
    //
    //     client2.on('connect', function(data){
    //       client2.emit('client connect', chatUser2.name);
    //     });
    //
    //     client2.on('new user', function(usersName){
    //       usersName.should.equal(chatUser2.name + " has joined.");
    //       client2.disconnect();
    //     });
    //
    //   });
    //
    //   var numUsers = 0;
    //   client1.on('new user', function(usersName){
    //     numUsers += 1;
    //
    //     if(numUsers === 2){
    //       usersName.should.equal(chatUser2.name + " has joined.");
    //       client1.disconnect();
    //       done();
    //     }
    //   });
    // });
  });
});
