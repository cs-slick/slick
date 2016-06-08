'use strict';

const request = require('request');
const CLIENT_ID = require('../../client-id.js');
//const Gracenote = require('node-gracenote');
const PrivateKeys = require('../../privateKeys.js');
const parseHelpers =  require('./parseHelpers.js');
const qs = require('querystring');

///////////////////////////////

const songsDataController = {};

songsDataController.playerState = {};

////// TEST ONLY ////////////

songsDataController.test = (req, res, next) => {
  req.body.artist = 'Queen';
  req.body.title = '';
  next();
}

/////////////////////////////
// SONGS DATA CONTROLLER SPOTIFY

songsDataController.getSpotifyData = (req, res, next) => {

  // we are creating a spotify API call request
  const spotifyBaseUrl = 'https://api.spotify.com/v1/';
  const spotifySearchType = 'search';
  const spotifyParameters = {
    type: 'artist,track',
    market: 'US',
    limit: 50,
  };

  spotifyParameters.q = req.body.artist; // Define search term

  const spotifyQuery = spotifyBaseUrl + spotifySearchType + '?' + qs.stringify(spotifyParameters);

  const spotifyOptions = {
    Accept: 'application/json',
    url: spotifyQuery,
  };
 /// making the actual Spotify API CALL
  request(spotifyOptions, (err, response, body) => {

    // PARSE result from spotify API CALL using parseHelpers parseSpotifyData

    req.body.parsedSpotifyData = parseHelpers.parseSpotifyData(JSON.parse(body), req.body.title, req.body.artist);
    if( req.body.parsedSpotifyData.length === 0 ) {
      res.status(404);
      return res.send("No search results match the artist and/or song name that you put out");
    }
    // create an array of promises that will make Youtube API calls
    req.body.youTubeRequestArray = parseHelpers.parseYouTubeRequests(req.body.parsedSpotifyData);

    next();

  });
};



songsDataController.getYouTubeData = (req, res, next) => {
  Promise
  .all(req.body.youTubeRequestArray)
  .then( (youTubeDataArray) => {
    // need to JSON parse each element of the array
    var afterPromiseYouTubeData = youTubeDataArray.map( JSON.parse);

    // now parse youtubeData with spotify Data and make final stringified object to send to client
    req.body.final = parseHelpers.parseYouTubeData(afterPromiseYouTubeData, req.body.parsedSpotifyData);

    next();
  });
};


module.exports = songsDataController;
