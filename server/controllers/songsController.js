const request = require('request');
const CLIENT_ID = require('../../client-id.js');
const Gracenote = require('node-gracenote');
const PrivateKeys = require('../../privateKeys.js');
const qs = require('querystring'); //need to successfully npm install

///////////////////////////////

//YOUTUBE QUERY

const baseUrl = 'https://www.googleapis.com/youtube/v3/';
const searchType = 'search';
const parameters = {
  part: 'snippet',
  maxResults: 5,
  order: 'viewCount',
  type: 'video',
  videoEmbeddable: true,
  videoSyndicated: true,
  key: PrivateKeys.googleApiKey,
};

parameters.q = searchTerm; // Define search term based on what is recieved from client

const youTubeQuery = baseUrl + searchType + '?' + qs.stringify(parameters);

request(youTubeQuery, function (err, response, body) {
  console.log(body);
  youTubeParser(body);
});

function youTubeParser (YTobj) {
  let youTubeResults = [];
  YTobj.items.forEach(function (song) {
    let songObj = {};
    songObj.videoId = song.id.videoId;
    songObj.title = song.snippet.title;
    songObj.description = song.snippet.description;
    youTubeResults.push(songObj);
  });
  return youTubeResults;
}
// request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=muse&type=video&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyBCv_kW7-ggyzKlfVHYfDVzAF5V3M2uwRM', function(err, response, body) {
//   console.log(body);
// });

// GRACENOTE QUERY

const clientId = PrivateKeys.clientId;
const clientTag = PrivateKeys.clientTag;
const userId = PrivateKeys.userId;
let api = new Gracenote(clientId, clientTag, userId);
api.searchArtist(searchTerm, function(err, result) { // Determine serach term based on what is recieved from client
  console.log(result);
  gracenoteParser(result);
  console.log('err ', err);
});

function gracenoteParser (GNarray) {
  
}


//////////////////////////////

// provide hardcoded array of song urls to achieve MVP
// future feature: add search functionality on front end to query list of
// song urls
const SONGS = [
  'https://soundcloud.com/theleisurecollective/nobody-feat-goldlink',
  'https://soundcloud.com/caseyperez/tempting-changes-2pac-x-chloe',
  'https://soundcloud.com/johncree/senior-skip-day-mac-miller',
  'https://soundcloud.com/andersonpaak/am-i-wrong-anderson-paak',
  'https://soundcloud.com/topdawgent/kendrick-lamar-backseat',
  'https://soundcloud.com/just-a-gent/backandforth',
  'https://soundcloud.com/nightsinoctober/champions-good-music'
];

const API_ENDPOINT = "http://api.soundcloud.com/resolve"

const songsDataController = {};

songsDataController.getSongsData = (req, res, next) => {
  const songPromisesArr = SONGS.map(url => {
    return new Promise((resolve, reject) => {
      const apiCall = `${API_ENDPOINT}?url=${url}&client_id=${CLIENT_ID}`
      request(apiCall, (err, res, body) => {
        if (res.statusCode === 404) resolve('');
        resolve(body);
      });
    });
  });
  Promise
    .all(songPromisesArr)
    .then(dataArr => {
      const filterEmptyStrings = dataArr.filter(songData => songData !== '');
      const parsedSongDataArr = filterEmptyStrings.map(JSON.parse);
      const output = parsedSongDataArr.map(songData => {
        return {
          artist: songData.user.username,
          songName: songData.title,
          thumbnailUrl: songData.artwork_url,
          trackUrl: songData.stream_url,
        }
      });
      req.data = output;
      next();
    });

};

module.exports = songsDataController;
