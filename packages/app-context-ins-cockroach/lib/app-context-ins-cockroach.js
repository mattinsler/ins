'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _insCockroach = require('ins-cockroach');

var _insCockroach2 = _interopRequireDefault(_insCockroach);

var _appContextCreateConnections = require('@mattinsler/app-context-create-connections');

var _appContextCreateConnections2 = _interopRequireDefault(_appContextCreateConnections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initializer = (0, _appContextCreateConnections2.default)('cockroach', function (url, opts) {
  return _insCockroach2.default.connect(url);
});

exports.default = initializer;