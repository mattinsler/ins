'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streams = exports.auth = exports.createKeypair = exports.Server = undefined;

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

var _execStream = require('./streams/exec-stream');

var _execStream2 = _interopRequireDefault(_execStream);

var _scpStream = require('./streams/scp-stream');

var _scpStream2 = _interopRequireDefault(_scpStream);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Server = _server2.default;
var auth = exports.auth = {
  Password: _password2.default,
  PublicKey: _publickey2.default
};

var streams = exports.streams = {
  Exec: _execStream2.default,
  SCP: _scpStream2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnMtc3NoLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUtleXBhaXIiLCJTZXJ2ZXIiLCJhdXRoIiwiUGFzc3dvcmQiLCJQdWJsaWNLZXkiLCJzdHJlYW1zIiwiRXhlYyIsIlNDUCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O2tCQU9TQSxhOzs7O0FBUFQ7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7UUFFT0MsTTtBQUdBLElBQU1DLHNCQUFPO0FBQ2xCQyw4QkFEa0I7QUFFbEJDO0FBRmtCLENBQWI7O0FBS0EsSUFBTUMsNEJBQVU7QUFDckJDLDRCQURxQjtBQUVyQkM7QUFGcUIsQ0FBaEIiLCJmaWxlIjoiaW5zLXNzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXNzd29yZCBmcm9tICcuL2F1dGgvcGFzc3dvcmQnO1xuaW1wb3J0IFB1YmxpY0tleSBmcm9tICcuL2F1dGgvcHVibGlja2V5JztcblxuaW1wb3J0IEV4ZWMgZnJvbSAnLi9zdHJlYW1zL2V4ZWMtc3RyZWFtJztcbmltcG9ydCBTQ1AgZnJvbSAnLi9zdHJlYW1zL3NjcC1zdHJlYW0nO1xuXG5leHBvcnQgU2VydmVyIGZyb20gJy4vc2VydmVyJztcbmV4cG9ydCB7IGNyZWF0ZUtleXBhaXIgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGF1dGggPSB7XG4gIFBhc3N3b3JkLFxuICBQdWJsaWNLZXlcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJlYW1zID0ge1xuICBFeGVjLFxuICBTQ1Bcbn07XG4iXX0=