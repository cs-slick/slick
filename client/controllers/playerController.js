
angular.module('Slick.PlayerController', ['mediaPlayer','Slick.QueueFactory'])
  .controller('PlayerController', ['$scope', 'QueueFactory', PlayerController])


function PlayerController(myScope, notqueuefactory) {
  myScope.urls = ['http://api.soundcloud.com/tracks/49931/stream?client_id=0937b0d9c276c8ed417e401221c65323'];
  console.log(myScope.scPlayer);

  myScope.testfunc = function() {
    myScope.customText = 'ok';
    myScope.scPlayer.playPause();
  }

  // notqueuefactory.fetch
  //   .then((json) => {
  //     json.forEach((obj) => {
  //       myScope.urls.push(obj.trackUrl);
  //     })
  //   })
}
