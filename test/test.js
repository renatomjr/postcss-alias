/*eslint no-unused-expressions: 0, block-scoped-var: 0, no-undef: 0*/
'use strict';

var postcss = require('postcss'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    plugin = require('../');

var test = function (fixture, opts, done) {
  var input = fixture + '.css',
      expected = fixture + '.expected.css';

  input = fs.readFileSync(path.join(__dirname, 'fixtures', input), 'utf8');
  expected = fs.readFileSync(path.join(__dirname, 'fixtures', expected), 'utf8');

  postcss([ plugin(opts) ])
    .process(input)
    .then(function (result) {
      expect(result.css).to.eql(expected);
      expect(result.warnings()).to.be.empty;
    done();
  }).catch(function (error) {
    done(error);
  });

};

describe('postcss-alias', function () {

  it('expands aliases', function (done) {
   test('main', { }, done);
  });

  it('handles edge cases', function (done) {
   test('edge', { }, done);
  });

  it('use option aliases', function (done) {
   test('option', {
     aliases: {
       fs: 'font-size',
       fw: 'font-weight',
       bg: 'background'
     }
   }, done);
  });

  it('override option aliases', function (done) {
   test('option-override', {
     aliases: {
       fs: 'font-size',
       fw: 'font-weight',
       bg: 'background'
     }
    }, done);
  });

  it('pass no option', function (done) {
    test('main', undefined, done);
  });

});
