angular.module('Slick.QueueController', ['Slick.QueueFactory'])
  .controller('QueueController', ['$scope','$http', 'QueueFactory', QueueController])
  .directive('queuedSongs', function() {
    return {
      restrict: 'E',
      template: '<div ng-class="testing"> <img src="{{songs.thumbnailUrl}}"> <span ng-class="songs">{{songs.artist}}</span> - {{songs.songName}}</div>'
    }


  })


  function QueueController(notscope, nothttp, notqueuefactory) {
    notscope.trackArray = [];
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
    //     notscope.songData = songs;
    //     songs.forEach((obj) => {
    //       let queueObj = {};
    //       queueObj.songName = obj.songName;
    //       queueObj.artist = obj.artist;
    //       queueObj.thumbnailUrl = obj.thumbnailUrl;
    //       notscope.trackArray.push(queueObj);
    //     })
    //   })

  }
