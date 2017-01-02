'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKeypair = createKeypair;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createKeypair(dir, keyname) {
  if (!_fs2.default.existsSync(keyDir)) {
    _fs2.default.mkdirSync(keyDir);
  }
  var keyfile = _path2.default.join(dir, keyname);
  if (!_fs2.default.existsSync(keyfile)) {
    (0, _child_process.execSync)('echo \'' + keyname + '\n\n\n\' | ssh-keygen -q -t rsa -b 4096 -N \'\' > /dev/null', { cwd: dir });
  }
}