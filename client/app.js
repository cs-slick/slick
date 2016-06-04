'use strict';






const app = angular.module('slickApp', ['Slick.QueueController', 'Slick.PlayerController', 'Slick.QueueFactory', 'plangular']);


app.config(function(plangularConfigProvider) {
  plangularConfigProvider.clientId = '0937b0d9c276c8ed417e401221c65323';
  console.log('hey');
});
