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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL3Bhc3N3b3JkLmpzIl0sIm5hbWVzIjpbIlBhc3N3b3JkQXV0aGVudGljYXRpb24iLCJvcHRzIiwibWV0aG9kIiwidXNlcnMiLCJyZWFkVXNlckZpbGUiLCJhdXRoZW50aWNhdGUiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiY2xpZW50IiwiZmlsZW5hbWUiLCJjb250ZW50IiwicmVhZEZpbGVTeW5jIiwidG9TdHJpbmciLCJKU09OIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVNQSxzQjtBQUdKLGtDQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQUE7QUFBQSxTQUZsQkMsTUFFa0IsR0FGVCxVQUVTOztBQUNoQixRQUFJLE9BQU9ELElBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsV0FBS0UsS0FBTCxHQUFhLEtBQUtDLFlBQUwsQ0FBa0JILElBQWxCLENBQWI7QUFDQSxXQUFLSSxZQUFMLEdBQW9CLGdCQUE0QjtBQUFBLFlBQXpCQyxRQUF5QixRQUF6QkEsUUFBeUI7QUFBQSxZQUFmQyxRQUFlLFFBQWZBLFFBQWU7O0FBQzlDLGVBQU8sTUFBS0osS0FBTCxDQUFXRyxRQUFYLEtBQXdCLE1BQUtILEtBQUwsQ0FBV0csUUFBWCxNQUF5QkMsUUFBeEQ7QUFDRCxPQUZEO0FBR0QsS0FMRCxNQUtPLElBQUksT0FBT04sSUFBUCxLQUFpQixVQUFyQixFQUFpQztBQUN0QyxXQUFLSSxZQUFMLEdBQW9CLGlCQUF5QkcsTUFBekIsRUFBb0M7QUFBQSxZQUFqQ0YsUUFBaUMsU0FBakNBLFFBQWlDO0FBQUEsWUFBdkJDLFFBQXVCLFNBQXZCQSxRQUF1Qjs7QUFDdEQsZUFBT04sS0FBSyxFQUFFSyxrQkFBRixFQUFZQyxrQkFBWixFQUFMLEVBQTZCQyxNQUE3QixDQUFQO0FBQ0QsT0FGRDtBQUdEO0FBQ0Y7Ozs7aUNBRVlDLFEsRUFBVTtBQUNyQixVQUFNQyxVQUFVLGFBQUdDLFlBQUgsQ0FBZ0JGLFFBQWhCLEVBQTBCRyxRQUExQixFQUFoQjtBQUNBLGFBQU9DLEtBQUtDLEtBQUwsQ0FBV0osT0FBWCxDQUFQO0FBQ0Q7Ozs7O2tCQUdZVixzQiIsImZpbGUiOiJwYXNzd29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmNsYXNzIFBhc3N3b3JkQXV0aGVudGljYXRpb24ge1xuICBtZXRob2QgPSAncGFzc3dvcmQnO1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBpZiAodHlwZW9mKG9wdHMpID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy51c2VycyA9IHRoaXMucmVhZFVzZXJGaWxlKG9wdHMpO1xuICAgICAgdGhpcy5hdXRoZW50aWNhdGUgPSAoeyB1c2VybmFtZSwgcGFzc3dvcmQgfSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2Vyc1t1c2VybmFtZV0gJiYgdGhpcy51c2Vyc1t1c2VybmFtZV0gPT09IHBhc3N3b3JkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mKG9wdHMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmF1dGhlbnRpY2F0ZSA9ICh7IHVzZXJuYW1lLCBwYXNzd29yZCB9LCBjbGllbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIG9wdHMoeyB1c2VybmFtZSwgcGFzc3dvcmQgfSwgY2xpZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWFkVXNlckZpbGUoZmlsZW5hbWUpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lKS50b1N0cmluZygpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhc3N3b3JkQXV0aGVudGljYXRpb247XG4iXX0=