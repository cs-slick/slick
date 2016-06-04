'use strict';



const socket = io()


const app = angular.module('slickApp', ['ngSoundcloud','mediaPlayer','Slick.QueueController', 'Slick.PlayerController', 'Slick.QueueFactory', 'plangular']);


app.config(function(plangularConfigProvider) {
  plangularConfigProvider.clientId = '0937b0d9c276c8ed417e401221c65323';
  console.log('hey');
});
