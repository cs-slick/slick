const express = require('express');
const app = express();
const cors = require('cors');
const songsController = require('./controllers/songsController');
const http = require('http').Server(app);
const io = require('socket.io')(http);

//setting up path directory and going up one level
app.use(express.static(__dirname + '/..'));

//sending the html file
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// client logic will request this API once index.html loads
// to retrieve stock song queue to generate list of songs
// to render on page
app.get('/songQueue', songsController.getSongsData, (req, res) => {
  res.json(req.data);
});

io.on('connection', socket => {
  socket.on('playSong', (songUrl) => {
    io.emit('playSong', songUrl);
  });
});

app.listen(3000);

module.exports = app;
