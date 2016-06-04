angular.module('Slick.PlayerController', ['Slick.QueueFactory'])
  .controller('PlayerController', ['$scope', 'QueueFactory', PlayerController])


function PlayerController(notscope, notqueuefactory) {
  notscope.urls = ['https://soundcloud.com/nextwaverecs/louis-the-child-feat-kflay-its-strange-jailo-remix'];

  // notqueuefactory.fetch
  //   .then((json) => {
  //     json.forEach((obj) => {
  //       notscope.urls.push(obj.trackUrl);
  //     })
  //   })
}
