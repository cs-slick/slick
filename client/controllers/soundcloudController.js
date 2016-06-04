/*
ngSoundcloud - An angular soundcloud element.
Just pop a <ng-soundcloud track="yourtrack"> and you're done.

TODO:
 - output JSON to scope instead of mapping variables.
 - addition of time controller like video.js or youtube.
 - more interesting design, transitions, coolbeans.

JSON API Reference
https://developers.soundcloud.com/docs/api/reference#tracks
*/
angular.module("ngSoundcloud", [])
.directive('ngSoundcloud', function ($http) {
    function link(scope) {
      var clientid = 'b23455855ab96a4556cbd0a98397ae8c';
        $http({
            method: 'GET',
            url: 'http://api.soundcloud.com/tracks/'+scope.track+'.json?client_id='+clientid
        }).
        success(function (data) {
            scope.band = data.user.username;
            scope.bandUrl = data.user.permalink_url;
            scope.title = data.title;
            scope.trackUrl = data.permalink_url;
            scope.albumArt = data.artwork_url.replace("large", "t500x500");
            scope.wave = data.waveform_url;
            scope.stream = data.stream_url + '?client_id=' + clientid;
            scope.song = new Audio();
        });
        scope.playing = false;
        scope.play = function () {
            scope.playing = !scope.playing;
            if (!scope.playing) {
              scope.song.pause();
            }
          else
            {
              if (scope.song.src == '') {scope.song.src = scope.stream;}
              scope.song.play();
            }
        }
    }
    return {
        restrict: 'E',
        scope: {
            track: '=track',
        },
        template: document.getElementById('container').innerHTML,
        link: link
    };
});
