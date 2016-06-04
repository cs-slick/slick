'use strict'

require('./dom-mock')('<html><body></body></html>');

const jsdom = require('mocha-jsdom');
const assert = require('assert');
const React = require('react');
const TestUtils = require('react-addons-test-utils');

describe('Testing my div', function() {
  jsdom({ skipWindowCheck: true });

  beforeEach(function() {
    const testing = require('..src/bundle.js')
  })

  it('should contain text: Lovely! Here it is - my very first React component!', function() {

    const asdf = TestUtils.renderIntoDocument(
      <VeryFirstDiv />
    );

    var divText = TestUtils.findRenderedDOMComponentWithTag(
      myDiv, 'span');

    assert.equal(divText.textContent, 'Lovely! Here it is - my very first React component!');
  });
});
