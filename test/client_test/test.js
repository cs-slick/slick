'use strict'
const mocha = require('mocha');
const expect = require('chai').expect
const sd = require('skin-deep');

describe('Slick' , function() {
  let vdom, instance, tree;
  //'put functions/stuff here that we need'


  describe('stuff we are doing with slick component or something', function() {
    beforeEach(function() {
      tree = sd.shallowRender(
        <Slick />
      );
      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
    });


    it('should do something', function() {
      expect(vdom.state.songInfo).to.not.eql([])
    })


  })


})









})
