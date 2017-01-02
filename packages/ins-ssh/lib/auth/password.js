'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordAuthentication = function () {
  function PasswordAuthentication(opts) {
    var _this = this;

    (0, _classCallCheck3.default)(this, PasswordAuthentication);
    this.method = 'password';

    if (typeof opts === 'string') {
      this.users = this.readUserFile(opts);
      this.authenticate = function (_ref) {
        var username = _ref.username,
            password = _ref.password;

        return _this.users[username] && _this.users[username] === password;
      };
    } else if (typeof opts === 'function') {
      this.authenticate = function (_ref2, client) {
        var username = _ref2.username,
            password = _ref2.password;

        return opts({ username: username, password: password }, client);
      };
    }
  }

  (0, _createClass3.default)(PasswordAuthentication, [{
    key: 'readUserFile',
    value: function readUserFile(filename) {
      var content = _fs2.default.readFileSync(filename).toString();
      return JSON.parse(content);
    }
  }]);
  return PasswordAuthentication;
}();

exports.default = PasswordAuthentication;