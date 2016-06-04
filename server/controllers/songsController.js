const request = require('request');

// provide hardcoded array of song urls to achieve MVP
// future feature: add search functionality on front end to query list of
// song urls
const SONGS = [
  'https://soundcloud.com/iameden/billie-jean',
  'https://soundcloud.com/theleisurecollective/nobody-feat-goldlink',
  'https://soundcloud.com/caseyperez/tempting-changes-2pac-x-chloe',
  'https://soundcloud.com/andersonpaak/am-i-wrong-anderson-paak',
  'https://soundcloud.com/topdawgent/kendrick-lamar-backseat',
  'https://soundcloud.com/just-a-gent/backandforth',
  'https://soundcloud.com/nightsinoctober/champions-good-music'
];

const CLIENT_ID = "&client_id=0937b0d9c276c8ed417e401221c65323";
const API_ENDPOINT = "http://api.soundcloud.com/resolve"

const songsDataController = {};

songsDataController.getSongsData = (req, res, next) => {
  const songPromisesArr = SONGS.map(url => {
    return new Promise((resolve, reject) => {
      const apiCall = `${API_ENDPOINT}?url=${url}${CLIENT_ID}`
      request(apiCall, (err, res, body) => {
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
          trackUrl: songData.permalink_url,
        }
      });
      req.data = output;
      next();
    });

};

module.exports = songsDataController;
