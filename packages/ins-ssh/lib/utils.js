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
  if (!_fs2.default.existsSync(dir)) {
    _fs2.default.mkdirSync(dir);
  }
  var keyfile = _path2.default.join(dir, keyname);
  if (!_fs2.default.existsSync(keyfile)) {
    (0, _child_process.execSync)('echo \'' + keyname + '\n\n\n\' | ssh-keygen -q -t rsa -b 4096 -N \'\' > /dev/null', { cwd: dir });
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVLZXlwYWlyIiwiZGlyIiwia2V5bmFtZSIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJrZXlmaWxlIiwiam9pbiIsImN3ZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0JBLGEsR0FBQUEsYTs7QUFKaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRU8sU0FBU0EsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLE9BQTVCLEVBQXFDO0FBQzFDLE1BQUksQ0FBQyxhQUFHQyxVQUFILENBQWNGLEdBQWQsQ0FBTCxFQUF5QjtBQUN2QixpQkFBR0csU0FBSCxDQUFhSCxHQUFiO0FBQ0Q7QUFDRCxNQUFNSSxVQUFVLGVBQUtDLElBQUwsQ0FBVUwsR0FBVixFQUFlQyxPQUFmLENBQWhCO0FBQ0EsTUFBSSxDQUFDLGFBQUdDLFVBQUgsQ0FBY0UsT0FBZCxDQUFMLEVBQTZCO0FBQzNCLDZDQUFrQkgsT0FBbEIsa0VBQXFGLEVBQUVLLEtBQUtOLEdBQVAsRUFBckY7QUFDRDtBQUNGIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUtleXBhaXIoZGlyLCBrZXluYW1lKSB7XG4gIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgZnMubWtkaXJTeW5jKGRpcik7XG4gIH1cbiAgY29uc3Qga2V5ZmlsZSA9IHBhdGguam9pbihkaXIsIGtleW5hbWUpO1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoa2V5ZmlsZSkpIHtcbiAgICBleGVjU3luYyhgZWNobyAnJHtrZXluYW1lfVxcblxcblxcbicgfCBzc2gta2V5Z2VuIC1xIC10IHJzYSAtYiA0MDk2IC1OICcnID4gL2Rldi9udWxsYCwgeyBjd2Q6IGRpciB9KTtcbiAgfVxufVxuIl19