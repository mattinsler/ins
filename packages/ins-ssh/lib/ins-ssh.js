'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.createKeypair = exports.Server = undefined;

var _utils = require('./utils');

Object.defineProperty(exports, 'createKeypair', {
  enumerable: true,
  get: function get() {
    return _utils.createKeypair;
  }
});

var _password = require('./auth/password');

var _password2 = _interopRequireDefault(_password);

var _publickey = require('./auth/publickey');

var _publickey2 = _interopRequireDefault(_publickey);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Server = _server2.default;
var auth = exports.auth = {
  Password: _password2.default,
  PublicKey: _publickey2.default
};