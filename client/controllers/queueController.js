angular.module('Slick.QueueController', [])
  .controller('QueueController', ['$scope','$http', QueueController])
  .directive('queuedSongs', function() {
    return {
      restrict: 'E',
      template: '<div ng-class="testing"> <img src="{{songs.thumbnailUrl}}"> <span ng-class="songs">{{songs.artist}}</span> - {{songs.songName}}</div>'
    }


  })


  function QueueController(notscope, nothttp) {
    notscope.songData = [
      {
        songName: "best song",
        artist: "best artist",
        thumbnailUrl: "bestpicture.jpg",
      },
      {
        songName: "best song",
        artist: "best artist",
        thumbnailUrl: "bestpicture.jpg",
      },
      {
        songName: "best song",
        artist: "best artist",
        thumbnailUrl: "bestpicture.jpg",
      },
      {
        songName: "best song",
        artist: "best artist",
        thumbnailUrl: "bestpicture.jpg",
      },
      {
        songName: "best song",
        artist: "best artist",
        thumbnailUrl: "bestpicture.jpg",
      }


    ]
    // QueueFactory.fetch
    //   .then((songs) => {
    //     notscope.songData = song;
    //   })

  }
