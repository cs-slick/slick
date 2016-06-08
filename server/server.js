const express = require('express');
const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);
const songsController = require('./controllers/songsController');
const cors = require('cors');
const bodyParser = require ('body-parser');

app.use(cors());

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//setting up path directory and going up one level
app.use(express.static(__dirname + '/..'));

// sending the html file
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// client logic will request this API once index.html loads
// to retrieve stock song queue to generate list of songs
// to render on page
app.get('/songQueue', (req, res) => {
  res.json(songsController.playerState);
});

app.post('/search', songsController.getSpotifyData);

// listen for song being clicked and added to the queue, then update everyone's state

io.on('connection', socket => {
  console.log('new client connected');
  socket.on('playSong', (newSongState) => {
    console.log('received updated Song State: ', newSongState);
    songsController.playerState = newSongState;
    io.emit('playSong', newSongState);
  });
// listen for queue update and then emit the new song state for all clients to update their state
  socket.on('updateQueue', (newSongState) => {
    songsController.playerState = newSongState;
    io.emit('updateQueue', newSongState);
  });

  // add playCurrent event handler
  socket.on('playCurrent', () => io.emit('playCurrent'));

  // add pauseCurrent event handler
  socket.on('pauseCurrent', () => io.emit('pauseCurrent'));

  socket.on('songEnded', (newSongState) => {
    console.log('song has ended!');
    io.emit('songEnded', newSongState);
  });
});

module.exports = app;
