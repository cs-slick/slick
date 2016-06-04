const express = require('express');
const app = express();
const cors = require('cors');
const SONGS = [
  'https://soundcloud.com/iameden/billie-jean',
  'https://soundcloud.com/theleisurecollective/nobody-feat-goldlink',
  'https://soundcloud.com/caseyperez/tempting-changes-2pac-x-chloe',
  'https://soundcloud.com/andersonpaak/am-i-wrong-anderson-paak',
  'https://soundcloud.com/topdawgent/kendrick-lamar-backseat',
  'https://soundcloud.com/just-a-gent/backandforth',
  'https://soundcloud.com/nightsinoctober/champions-good-music'
];

//setting up path directory and going up one level
app.use(express.static(__dirname + '/..'));

//sending the html file
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/songQueue', (req, res) => {
  res.json([
    {
      artist: 'Kanye',
      songName: 'Famous',
      thumbnailUrl: 'http://kanyethegod.com',
      embedHtml: 'this is html string',
    },
    {
      artist: 'Kanye',
      songName: 'Famous',
      thumbnailUrl: 'http://kanyethegod.com',
      embedHtml: 'this is html string',
    }
  ]);
});

app.listen(3000);

module.exports = app;
