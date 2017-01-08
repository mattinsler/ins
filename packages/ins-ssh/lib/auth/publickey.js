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

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _ssh = require('ssh2');

var _bufferEqualConstantTime = require('buffer-equal-constant-time');

var _bufferEqualConstantTime2 = _interopRequireDefault(_bufferEqualConstantTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PublicKeyAuthentication = function () {
  function PublicKeyAuthentication(authorizedKeyFile) {
    (0, _classCallCheck3.default)(this, PublicKeyAuthentication);
    this.method = 'publickey';

    this.publicKey = _ssh.utils.genPublicKey(_ssh.utils.parseKey(_fs2.default.readFileSync(authorizedKeyFile)));
    console.log(this.publicKey);
  }

  (0, _createClass3.default)(PublicKeyAuthentication, [{
    key: 'authenticate',
    value: function authenticate(_ref) {
      var blob = _ref.blob,
          key = _ref.key,
          sigAlgo = _ref.sigAlgo,
          signature = _ref.signature;

      console.log('PUBLICKEY');
      console.log(key.data.toString());
      if (key.algo === this.publicKey.fulltype && (0, _bufferEqualConstantTime2.default)(key.data, this.publicKey.public)) {
        if (!signature) {
          return true;
        }

        var verifier = _crypto2.default.createVerify(sigAlgo);
        verifier.update(blob);

        return verifier.verify(this.publicKey.publicOrig, signature);
      }

      return false;
    }
  }]);
  return PublicKeyAuthentication;
}();

exports.default = PublicKeyAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL3B1YmxpY2tleS5qcyJdLCJuYW1lcyI6WyJQdWJsaWNLZXlBdXRoZW50aWNhdGlvbiIsImF1dGhvcml6ZWRLZXlGaWxlIiwibWV0aG9kIiwicHVibGljS2V5IiwiZ2VuUHVibGljS2V5IiwicGFyc2VLZXkiLCJyZWFkRmlsZVN5bmMiLCJjb25zb2xlIiwibG9nIiwiYmxvYiIsImtleSIsInNpZ0FsZ28iLCJzaWduYXR1cmUiLCJkYXRhIiwidG9TdHJpbmciLCJhbGdvIiwiZnVsbHR5cGUiLCJwdWJsaWMiLCJ2ZXJpZmllciIsImNyZWF0ZVZlcmlmeSIsInVwZGF0ZSIsInZlcmlmeSIsInB1YmxpY09yaWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7SUFFTUEsdUI7QUFHSixtQ0FBWUMsaUJBQVosRUFBK0I7QUFBQTtBQUFBLFNBRi9CQyxNQUUrQixHQUZ0QixXQUVzQjs7QUFDN0IsU0FBS0MsU0FBTCxHQUFpQixXQUFNQyxZQUFOLENBQW1CLFdBQU1DLFFBQU4sQ0FBZSxhQUFHQyxZQUFILENBQWdCTCxpQkFBaEIsQ0FBZixDQUFuQixDQUFqQjtBQUNBTSxZQUFRQyxHQUFSLENBQVksS0FBS0wsU0FBakI7QUFDRDs7Ozt1Q0FFK0M7QUFBQSxVQUFqQ00sSUFBaUMsUUFBakNBLElBQWlDO0FBQUEsVUFBM0JDLEdBQTJCLFFBQTNCQSxHQUEyQjtBQUFBLFVBQXRCQyxPQUFzQixRQUF0QkEsT0FBc0I7QUFBQSxVQUFiQyxTQUFhLFFBQWJBLFNBQWE7O0FBQzlDTCxjQUFRQyxHQUFSLENBQVksV0FBWjtBQUNBRCxjQUFRQyxHQUFSLENBQVlFLElBQUlHLElBQUosQ0FBU0MsUUFBVCxFQUFaO0FBQ0EsVUFBSUosSUFBSUssSUFBSixLQUFhLEtBQUtaLFNBQUwsQ0FBZWEsUUFBNUIsSUFBd0MsdUNBQWFOLElBQUlHLElBQWpCLEVBQXVCLEtBQUtWLFNBQUwsQ0FBZWMsTUFBdEMsQ0FBNUMsRUFBMkY7QUFDekYsWUFBSSxDQUFDTCxTQUFMLEVBQWdCO0FBQUUsaUJBQU8sSUFBUDtBQUFjOztBQUVoQyxZQUFNTSxXQUFXLGlCQUFPQyxZQUFQLENBQW9CUixPQUFwQixDQUFqQjtBQUNBTyxpQkFBU0UsTUFBVCxDQUFnQlgsSUFBaEI7O0FBRUEsZUFBT1MsU0FBU0csTUFBVCxDQUFnQixLQUFLbEIsU0FBTCxDQUFlbUIsVUFBL0IsRUFBMkNWLFNBQTNDLENBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQVA7QUFDRDs7Ozs7a0JBR1laLHVCIiwiZmlsZSI6InB1YmxpY2tleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gJ3NzaDInO1xuaW1wb3J0IGJ1ZmZlcnNFcXVhbCBmcm9tICdidWZmZXItZXF1YWwtY29uc3RhbnQtdGltZSc7XG5cbmNsYXNzIFB1YmxpY0tleUF1dGhlbnRpY2F0aW9uIHtcbiAgbWV0aG9kID0gJ3B1YmxpY2tleSc7XG5cbiAgY29uc3RydWN0b3IoYXV0aG9yaXplZEtleUZpbGUpIHtcbiAgICB0aGlzLnB1YmxpY0tleSA9IHV0aWxzLmdlblB1YmxpY0tleSh1dGlscy5wYXJzZUtleShmcy5yZWFkRmlsZVN5bmMoYXV0aG9yaXplZEtleUZpbGUpKSk7XG4gICAgY29uc29sZS5sb2codGhpcy5wdWJsaWNLZXkpO1xuICB9XG5cbiAgYXV0aGVudGljYXRlKHsgYmxvYiwga2V5LCBzaWdBbGdvLCBzaWduYXR1cmUgfSkge1xuICAgIGNvbnNvbGUubG9nKCdQVUJMSUNLRVknKTtcbiAgICBjb25zb2xlLmxvZyhrZXkuZGF0YS50b1N0cmluZygpKTtcbiAgICBpZiAoa2V5LmFsZ28gPT09IHRoaXMucHVibGljS2V5LmZ1bGx0eXBlICYmIGJ1ZmZlcnNFcXVhbChrZXkuZGF0YSwgdGhpcy5wdWJsaWNLZXkucHVibGljKSkge1xuICAgICAgaWYgKCFzaWduYXR1cmUpIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgY29uc3QgdmVyaWZpZXIgPSBjcnlwdG8uY3JlYXRlVmVyaWZ5KHNpZ0FsZ28pO1xuICAgICAgdmVyaWZpZXIudXBkYXRlKGJsb2IpO1xuXG4gICAgICByZXR1cm4gdmVyaWZpZXIudmVyaWZ5KHRoaXMucHVibGljS2V5LnB1YmxpY09yaWcsIHNpZ25hdHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1YmxpY0tleUF1dGhlbnRpY2F0aW9uO1xuIl19