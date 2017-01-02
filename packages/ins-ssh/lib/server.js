'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ssh = require('ssh2');

var _ssh2 = _interopRequireDefault(_ssh);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function () {
  // listens for connections
  // spits out sockets
  function Server() {
    (0, _classCallCheck3.default)(this, Server);

    this.serverOptions = {
      hostKeys: []
    };
    this.authModules = [];
  }

  (0, _createClass3.default)(Server, [{
    key: 'addKey',
    value: function addKey(key) {
      if (typeof key === 'string') {
        var keyBuffer = _fs2.default.readFileSync(key);
        this.serverOptions.hostKeys.push(keyBuffer);
      } else if (Buffer.isBufer(key)) {
        this.serverOptions.hostKeys.push(key);
      }

      return this;
    }
  }, {
    key: 'useAuthentication',
    value: function useAuthentication(authModule) {
      this.authModules.push(authModule);

      return this;
    }
  }, {
    key: 'listen',
    value: function listen(port) {
      var _this = this;

      var address = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0.0.0';

      this.server = new _ssh2.default.Server(this.serverOptions, function (client) {
        return _this.onClient(client);
      });

      return new _promise2.default(function (resolve, reject) {
        _this.server.listen(port, address, function () {
          resolve(_this.server.address());
        });
      });
    }
  }, {
    key: 'onClient',
    value: function onClient(client) {
      var _this2 = this;

      client.on('authentication', function (ctx) {
        var handled = false;
        var method = ctx.method;


        console.log(method);
        console.log(_this2.authModules.map(function (a) {
          return a.method;
        }));

        var auth = _this2.authModules.find(function (a) {
          return a.method === method;
        });
        console.log(auth);

        if (!auth) {
          return ctx.reject();
        }

        console.log('AUTH');

        if (auth.authenticate(ctx, client)) {
          ctx.accept();
        } else {
          ctx.reject();
        }
      });

      client.on('ready', function () {
        client.on('session', function (accept, reject) {
          var session = new _session2.default(_this2, client, accept());
          session.start();
        });
      });

      client.on('end', function () {
        console.log('Client disconnected');
      });
    }
  }]);
  return Server;
}();

exports.default = Server;