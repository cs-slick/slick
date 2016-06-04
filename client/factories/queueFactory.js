angular.module('Slick.QueueFactory', [])
  .factory('QueueFactory', ['$http' QueueFactory])


function QueueFactory (nothttp) {
  return {
    fetch: () => {
      return nothttp.get('PUT GET REQUEST ROUTE HERE');
    }


  }

}
