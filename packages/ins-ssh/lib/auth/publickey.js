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