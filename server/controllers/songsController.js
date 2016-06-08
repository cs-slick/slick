'use strict';

const request = require('request');
const CLIENT_ID = require('../../client-id.js');
//const Gracenote = require('node-gracenote');
const PrivateKeys = require('../../privateKeys.js');
const qs = require('querystring');

///////////////////////////////

//YOUTUBE QUERY

// const youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/';
// const youtubeSearchType = 'search';
// const youtubeParameters = {
//   part: 'snippet',
//   maxResults: 1,
//   order: 'viewCount',
//   type: 'video',
//   videoEmbeddable: true,
//   videoSyndicated: true,
//   key: PrivateKeys.googleApiKey,
// };

// youtubeParameters.q = req.body.artist + req.body.title; // Define search term based on what is recieved from client

// const youTubeQuery = youtubeBaseUrl + youtubeSearchType + '?' + qs.stringify(youtubeParameters);

// request(youTubeQuery, function (err, response, body) {
//   console.log(body);
//   youTubeParser(body);
// });

// function youTubeParser (YTobj) {
//   let youTubeResults = [];
//   YTobj.items.forEach(function (song) {
//     let songObj = {};
//     songObj.videoId = song.id.videoId;
//     songObj.description = song.snippet.description;
//     youTubeResults.push(songObj);
//   });
//   return youTubeResults;
// }
// request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=muse&type=video&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyBCv_kW7-ggyzKlfVHYfDVzAF5V3M2uwRM', function(err, response, body) {
//   console.log(body);
// });

// SPOTIFY QUERY

// const spotifyBaseUrl = 'https://api.spotify.com/v1/';
// const spotifySearchType = 'search';
// const spotifyParameters = {
//   type: 'artist,track',
//   market: 'US',
//   limit: 5,
// };

// spotifyParameters.q = req.body.artist + req.body.title; // Define search term

// const spotifyQuery = spotifyBaseUrl + spotifySearchType + '?' + qs.stringify(spotifyParameters);

// const spotifyOptions = {
//   Accept: 'application/json',
//   url: spotifyQuery,
// };

// request(spotifyOptions, function (err, response, body) {
//   console.log(body);
// });


// // GRACENOTE QUERY

// const clientId = PrivateKeys.clientId;
// const clientTag = PrivateKeys.clientTag;
// const userId = PrivateKeys.userId;
// let api = new Gracenote(clientId, clientTag, userId);
// api.searchArtist(searchTerm, function(err, result) { // Determine serach term based on what is recieved from client
//   console.log(result);
//   console.log('err ', err);
// });


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

songsDataController.playerState = {};

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

// SONGS DATA CONTROLLER SPOTIFY

songsDataController.test = (req, res, next) => {
  req.body.artist = 'KC and the Sunshine Band ';
  req.body.title = '';
  next();
}

songsDataController.parseSpotifyData =  (data, title, artist) => {
  console.log('spotify data ', data);
  var final = [];
  var tracks = data.tracks.items;

// if no title provided, grab first five track results
  if(title === "") {
    tracks = tracks.slice(0, 5);
  }

// if title is provided, loop thorugh all track names until a match is found
  else {
    //use for loop
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].name.indexOf(title) > -1) {
        tracks = [tracks[i]];
        break;
      }
    }
  }
  // now traverse tracks objects and pull out necessary info from each
  //and push complete object into final array

  tracks.forEach( (trackObject) => {

    var parsedObject = {};
    parsedObject.albumImg = trackObject.album.images[2].url;
    parsedObject.artistImg = data.artists.items[0].images[0].url;
    parsedObject.album = trackObject.album.name;
    parsedObject.artist = data.artists.items[0].name;
    parsedObject.title = trackObject.name;

    final.push(parsedObject);
  });

  return final;
};

songsDataController.parseYouTubeRequests = (spotifyObjects) => {
  // build youtube query string
  const youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/';
  const youtubeSearchType = 'search';
  const youtubeParameters = {
    part: 'snippet',
    maxResults: 1,
    order: 'viewCount',
    type: 'video',
    videoEmbeddable: true,
    videoSyndicated: true,
    key: PrivateKeys.googleApiKey,
  };

  const youTubeRequests = spotifyObjects.map(spotifyObject => {
    return new Promise((resolve, reject) => {

      youtubeParameters.q = spotifyObject.artist + spotifyObject.title; // Define search term based on what is recieved from client
      const youTubeQuery = youtubeBaseUrl + youtubeSearchType + '?' + qs.stringify(youtubeParameters);

      request(youTubeQuery, (err, res, body) => {
        if (res.statusCode === 404) resolve('');
        resolve(body);
      });
    });
  });
  return youTubeRequests;
};

songsDataController.getYouTubeData = (promiseArray, finalArray, res) => {
  Promise
  .all(promiseArray)
  .then( (youTubeDataArray) => {
    var afterPromiseYouTubeData = youTubeDataArray.map( JSON.parse);
    songsDataController.parseYouTubeData(afterPromiseYouTubeData, finalArray, res);
  });
};

songsDataController.parseYouTubeData = (dataToBeParsed, finalArray, res) => {
  var combinedData = [];

  if(finalArray.length === 1 && dataToBeParsed[0].items.length > 0) {
    combinedData.push(finalArray[0]);
    combinedData[0].videoId = dataToBeParsed[0].items[0].id.videoId;
    combinedData[0].description = dataToBeParsed[0].items[0].snippet.description;
  }
  else {
    for(var i = 0; i < finalArray.length; i++) {
      if(dataToBeParsed[i].items.length !== 0 ) {
        combinedData.push(finalArray[i]);
        combinedData[combinedData.length-1].videoId = dataToBeParsed[i].items[0].id.videoId;
        combinedData[combinedData.length-1].description = dataToBeParsed[i].items[0].snippet.description;
      }
    }

  }

  return res.send(JSON.stringify(combinedData));
};

songsDataController.getSpotifyData = (req, res, next) => {
  console.log('request body ', req.body);
  const spotifyBaseUrl = 'https://api.spotify.com/v1/';
  const spotifySearchType = 'search';
  const spotifyParameters = {
    type: 'artist,track',
    market: 'US',
    limit: 20,
  };

  spotifyParameters.q = req.body.artist; // Define search term

  const spotifyQuery = spotifyBaseUrl + spotifySearchType + '?' + qs.stringify(spotifyParameters);

  const spotifyOptions = {
    Accept: 'application/json',
    url: spotifyQuery,
  };

  request(spotifyOptions, (err, response, body) => {

    req.body.final = songsDataController.parseSpotifyData(JSON.parse(body), req.body.title, req.body.artist);

    req.body.youTubeRequestArray = songsDataController.parseYouTubeRequests(req.body.final);


    req.body.youTubeArray = songsDataController.getYouTubeData(req.body.youTubeRequestArray, req.body.final, res);


  });
};

module.exports = songsDataController;
