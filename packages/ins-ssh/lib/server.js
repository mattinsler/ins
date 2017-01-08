'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

      client.on('authentication', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
          var handled, method, auth;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  handled = false;
                  method = ctx.method;
                  auth = _this2.authModules.find(function (a) {
                    return a.method === method;
                  });

                  if (auth) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt('return', ctx.reject());

                case 5:
                  _context.next = 7;
                  return auth.authenticate(ctx, client);

                case 7:
                  if (!_context.sent) {
                    _context.next = 11;
                    break;
                  }

                  ctx.accept();
                  _context.next = 12;
                  break;

                case 11:
                  ctx.reject();

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }());

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIuanMiXSwibmFtZXMiOlsiU2VydmVyIiwic2VydmVyT3B0aW9ucyIsImhvc3RLZXlzIiwiYXV0aE1vZHVsZXMiLCJrZXkiLCJrZXlCdWZmZXIiLCJyZWFkRmlsZVN5bmMiLCJwdXNoIiwiQnVmZmVyIiwiaXNCdWZlciIsImF1dGhNb2R1bGUiLCJwb3J0IiwiYWRkcmVzcyIsInNlcnZlciIsImNsaWVudCIsIm9uQ2xpZW50IiwicmVzb2x2ZSIsInJlamVjdCIsImxpc3RlbiIsIm9uIiwiY3R4IiwiaGFuZGxlZCIsIm1ldGhvZCIsImF1dGgiLCJmaW5kIiwiYSIsImF1dGhlbnRpY2F0ZSIsImFjY2VwdCIsInNlc3Npb24iLCJzdGFydCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsTTtBQUNKO0FBQ0E7QUFDQSxvQkFBYztBQUFBOztBQUNaLFNBQUtDLGFBQUwsR0FBcUI7QUFDbkJDLGdCQUFVO0FBRFMsS0FBckI7QUFHQSxTQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0Q7Ozs7MkJBRU1DLEcsRUFBSztBQUNWLFVBQUksT0FBT0EsR0FBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QixZQUFNQyxZQUFZLGFBQUdDLFlBQUgsQ0FBZ0JGLEdBQWhCLENBQWxCO0FBQ0EsYUFBS0gsYUFBTCxDQUFtQkMsUUFBbkIsQ0FBNEJLLElBQTVCLENBQWlDRixTQUFqQztBQUNELE9BSEQsTUFHTyxJQUFJRyxPQUFPQyxPQUFQLENBQWVMLEdBQWYsQ0FBSixFQUF5QjtBQUM5QixhQUFLSCxhQUFMLENBQW1CQyxRQUFuQixDQUE0QkssSUFBNUIsQ0FBaUNILEdBQWpDO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0Q7OztzQ0FFaUJNLFUsRUFBWTtBQUM1QixXQUFLUCxXQUFMLENBQWlCSSxJQUFqQixDQUFzQkcsVUFBdEI7O0FBRUEsYUFBTyxJQUFQO0FBQ0Q7OzsyQkFFTUMsSSxFQUEyQjtBQUFBOztBQUFBLFVBQXJCQyxPQUFxQix1RUFBWCxTQUFXOztBQUNoQyxXQUFLQyxNQUFMLEdBQWMsSUFBSSxjQUFLYixNQUFULENBQ1osS0FBS0MsYUFETyxFQUVaLFVBQUNhLE1BQUQ7QUFBQSxlQUFZLE1BQUtDLFFBQUwsQ0FBY0QsTUFBZCxDQUFaO0FBQUEsT0FGWSxDQUFkOztBQUtBLGFBQU8sc0JBQVksVUFBQ0UsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGNBQUtKLE1BQUwsQ0FBWUssTUFBWixDQUFtQlAsSUFBbkIsRUFBeUJDLE9BQXpCLEVBQWtDLFlBQU07QUFDdENJLGtCQUFRLE1BQUtILE1BQUwsQ0FBWUQsT0FBWixFQUFSO0FBQ0QsU0FGRDtBQUdELE9BSk0sQ0FBUDtBQUtEOzs7NkJBRVFFLE0sRUFBUTtBQUFBOztBQUNmQSxhQUFPSyxFQUFQLENBQVUsZ0JBQVY7QUFBQSw4RUFBNEIsaUJBQU9DLEdBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCQyx5QkFEc0IsR0FDWixLQURZO0FBRWxCQyx3QkFGa0IsR0FFUEYsR0FGTyxDQUVsQkUsTUFGa0I7QUFJcEJDLHNCQUpvQixHQUliLE9BQUtwQixXQUFMLENBQWlCcUIsSUFBakIsQ0FBc0I7QUFBQSwyQkFBS0MsRUFBRUgsTUFBRixLQUFhQSxNQUFsQjtBQUFBLG1CQUF0QixDQUphOztBQUFBLHNCQU1yQkMsSUFOcUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsbURBTU5ILElBQUlILE1BQUosRUFOTTs7QUFBQTtBQUFBO0FBQUEseUJBUWhCTSxLQUFLRyxZQUFMLENBQWtCTixHQUFsQixFQUF1Qk4sTUFBdkIsQ0FSZ0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTeEJNLHNCQUFJTyxNQUFKO0FBVHdCO0FBQUE7O0FBQUE7QUFXeEJQLHNCQUFJSCxNQUFKOztBQVh3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUE1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFlQUgsYUFBT0ssRUFBUCxDQUFVLE9BQVYsRUFBbUIsWUFBTTtBQUN2QkwsZUFBT0ssRUFBUCxDQUFVLFNBQVYsRUFBcUIsVUFBQ1EsTUFBRCxFQUFTVixNQUFULEVBQW9CO0FBQ3ZDLGNBQU1XLFVBQVUsOEJBQWtCZCxNQUFsQixFQUEwQmEsUUFBMUIsQ0FBaEI7QUFDQUMsa0JBQVFDLEtBQVI7QUFDRCxTQUhEO0FBSUQsT0FMRDs7QUFPQWYsYUFBT0ssRUFBUCxDQUFVLEtBQVYsRUFBaUIsWUFBVztBQUMxQlcsZ0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNELE9BRkQ7QUFHRDs7Ozs7a0JBR1kvQixNIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgc3NoMiBmcm9tICdzc2gyJztcbmltcG9ydCBTZXNzaW9uIGZyb20gJy4vc2Vzc2lvbic7XG5cbmNsYXNzIFNlcnZlciB7XG4gIC8vIGxpc3RlbnMgZm9yIGNvbm5lY3Rpb25zXG4gIC8vIHNwaXRzIG91dCBzb2NrZXRzXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2VydmVyT3B0aW9ucyA9IHtcbiAgICAgIGhvc3RLZXlzOiBbXVxuICAgIH07XG4gICAgdGhpcy5hdXRoTW9kdWxlcyA9IFtdO1xuICB9XG5cbiAgYWRkS2V5KGtleSkge1xuICAgIGlmICh0eXBlb2Yoa2V5KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGtleUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhrZXkpO1xuICAgICAgdGhpcy5zZXJ2ZXJPcHRpb25zLmhvc3RLZXlzLnB1c2goa2V5QnVmZmVyKTtcbiAgICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmVyKGtleSkpIHtcbiAgICAgIHRoaXMuc2VydmVyT3B0aW9ucy5ob3N0S2V5cy5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1c2VBdXRoZW50aWNhdGlvbihhdXRoTW9kdWxlKSB7XG4gICAgdGhpcy5hdXRoTW9kdWxlcy5wdXNoKGF1dGhNb2R1bGUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW4ocG9ydCwgYWRkcmVzcyA9ICcwLjAuMC4wJykge1xuICAgIHRoaXMuc2VydmVyID0gbmV3IHNzaDIuU2VydmVyKFxuICAgICAgdGhpcy5zZXJ2ZXJPcHRpb25zLFxuICAgICAgKGNsaWVudCkgPT4gdGhpcy5vbkNsaWVudChjbGllbnQpXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnNlcnZlci5saXN0ZW4ocG9ydCwgYWRkcmVzcywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuc2VydmVyLmFkZHJlc3MoKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2xpZW50KGNsaWVudCkge1xuICAgIGNsaWVudC5vbignYXV0aGVudGljYXRpb24nLCBhc3luYyAoY3R4KSA9PiB7XG4gICAgICBsZXQgaGFuZGxlZCA9IGZhbHNlO1xuICAgICAgY29uc3QgeyBtZXRob2QgfSA9IGN0eDtcblxuICAgICAgY29uc3QgYXV0aCA9IHRoaXMuYXV0aE1vZHVsZXMuZmluZChhID0+IGEubWV0aG9kID09PSBtZXRob2QpO1xuXG4gICAgICBpZiAoIWF1dGgpIHsgcmV0dXJuIGN0eC5yZWplY3QoKTsgfVxuXG4gICAgICBpZiAoYXdhaXQgYXV0aC5hdXRoZW50aWNhdGUoY3R4LCBjbGllbnQpKSB7XG4gICAgICAgIGN0eC5hY2NlcHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5yZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNsaWVudC5vbigncmVhZHknLCAoKSA9PiB7XG4gICAgICBjbGllbnQub24oJ3Nlc3Npb24nLCAoYWNjZXB0LCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBTZXNzaW9uKHRoaXMsIGNsaWVudCwgYWNjZXB0KCkpO1xuICAgICAgICBzZXNzaW9uLnN0YXJ0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNsaWVudC5vbignZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnQ2xpZW50IGRpc2Nvbm5lY3RlZCcpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZlcjtcbiJdfQ==