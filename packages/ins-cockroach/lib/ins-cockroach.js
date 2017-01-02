'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _betturl = require('betturl');

var _betturl2 = _interopRequireDefault(_betturl);

var _pool = require('./pool');

var _pool2 = _interopRequireDefault(_pool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectPool(parsed) {
  return new _promise2.default(function (resolve, reject) {
    var opts = {
      host: parsed.host,
      port: parsed.port,
      max: 10
    };

    if (parsed.auth) {
      if (parsed.auth.user) {
        opts.user = parsed.auth.user;
      }
      if (parsed.auth.password) {
        opts.password = parsed.auth.password;
      }
    }

    if (parsed.path) {
      var path = parsed.path.replace(/^\/+/, '');
      if (path) {
        opts.database = path;
      }
    }

    var pool = new _pool2.default(opts);

    pool.on('connected', function () {
      return resolve(pool);
    });
    pool.on('error', reject);

    pool.connect();
  });
}

var Cockroach = {
  connections: [],

  connect: function connect(url) {
    var parsed = _betturl2.default.parse(url);
    // normalize? use names?
    if (!this.connections[url]) {
      this.connections[url] = connectPool(parsed);
    }

    return this.connections[url];
  }
};

exports.default = Cockroach;