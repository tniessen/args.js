
var argsjs = require('..'),
    Parser = argsjs.Parser,
    expect = require('chai').expect;

describe('Error objects', function() {
  var parser;
  before(function() {
    parser = new Parser([
      { id: 'requiredParam', required: true }
    ]);
  });
  after(function() {
    parser = null;
  });
  it('should be instances of ParserError', function() {
    expect(function() {
      parser.parse([]);
    }).to.throw(argsjs.ParserError);
  });
  it('should have a "message" property (string)', function() {
    parser.parse([], function(err, result) {
      expect(err).to.have.property('message')
        .that.is.a('string');
    });
  });
  it('should have a "parser" property', function() {
    parser.parse([], function(err, result) {
      expect(err).to.have.property('parser')
        .that.equals(parser);
    });
  });
  it('should have a "reason" property', function() {
    parser.parse([], function(err, result) {
      expect(err).to.have.property('reason');
    });
  });
  it('should support "toString"', function() {
    parser.parse([], function(err, result) {
      var msg = err.toString();
      expect(msg).to.contain('ParserError')
        .and.to.contain('Missing')
        .and.to.contain('requiredParam');
    });
  });
});

