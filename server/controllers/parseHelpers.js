'use strict';

const PrivateKeys = require('../../privateKeys.js');
const qs = require('querystring');
const request = require('request');


const parseHelpers = {};

parseHelpers.parseSpotifyData = (data, title, artist) => {

  var parsedSpotifyData = [];
  var tracksSpotifyData = data.tracks.items;
  var editedTracks = [];
  var parsedTracks = [];

//loop through results and make sure the tracks are by the artist that is being queried

for(var i = 0; i < tracksSpotifyData.length; i++) {
  if(tracksSpotifyData[i].artists[0].name.toLowerCase() === artist.toLowerCase()) {
    editedTracks.push(tracksSpotifyData[i]);
  }
}
// if no title provided, grab first five track results
  if(title === "") {
    parsedTracks = editedTracks.slice(0, 5);
  }

// if title is provided, loop thorugh all track names until a match is found
  else {
    //use for loop to look for the track name that matches title
    for (var i = 0; i < editedTracks.length; i++) {
      if (editedTracks[i].name.toLowerCase().indexOf(title.toLowerCase()) > -1) {
        parsedTracks = [];
        parsedTracks.push(editedTracks[i]);
        break;
      }
    }

  }
  // now traverse tracks objects and pull out necessary info from each
  //and push complete object into final array
  if (parsedTracks.length === 0) {
    return [];
  }
  parsedTracks.forEach( (trackObject) => {

    var parsedObject = {};
    parsedObject.albumImg = trackObject.album.images[2].url;
    parsedObject.artistImg = data.artists.items[0].images[0].url;
    parsedObject.album = trackObject.album.name;
    parsedObject.artist = data.artists.items[0].name;
    parsedObject.title = trackObject.name;

    parsedSpotifyData.push(parsedObject);
  });

  return parsedSpotifyData;
};

parseHelpers.parseYouTubeRequests = (spotifyObjects) => {

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
  //an array of promises of Youtube API calls
  return youTubeRequests;
};

parseHelpers.parseYouTubeData = (dataToBeParsed, parsedSpotifyData) => {

  var combinedData = [];

  if(parsedSpotifyData.length === 1 && dataToBeParsed[0].items.length > 0) {
    combinedData.push(parsedSpotifyData[0]);
    combinedData[0].videoId = dataToBeParsed[0].items[0].id.videoId;
    combinedData[0].description = dataToBeParsed[0].items[0].snippet.description;
  }
  else {
    for(var i = 0; i < parsedSpotifyData.length; i++) {
      if(dataToBeParsed[i].items.length !== 0 ) {
        combinedData.push(parsedSpotifyData[i]);
        combinedData[combinedData.length-1].videoId = dataToBeParsed[i].items[0].id.videoId;
        combinedData[combinedData.length-1].description = dataToBeParsed[i].items[0].snippet.description;
      }
    }

  }

  return JSON.stringify(combinedData);
};





module.exports = parseHelpers;
