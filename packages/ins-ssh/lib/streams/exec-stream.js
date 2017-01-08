'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _stream = require('stream');

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExecStream = function (_Duplex) {
  (0, _inherits3.default)(ExecStream, _Duplex);

  function ExecStream(command) {
    (0, _classCallCheck3.default)(this, ExecStream);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExecStream.__proto__ || (0, _getPrototypeOf2.default)(ExecStream)).call(this));

    _this.command = command;
    return _this;
  }

  (0, _createClass3.default)(ExecStream, [{
    key: '_write',
    value: function _write(chunk, encoding, callback) {
      this.proc.stdin.write(chunk, encoding, callback);
    }
  }, {
    key: '_read',
    value: function _read(size) {
      // just trigger proc creation
      this.proc;
    }
  }, {
    key: 'proc',
    get: function get() {
      var _this2 = this;

      if (!this.proc) {
        this.proc = (0, _child_process.spawn)('/bin/sh', ['-c', this.command], { stdio: ['pipe', 'pipe', 'ignore'] });
        this.proc.stdout.on('data', function (data) {
          return _this2.push(data);
        });
        this.proc.on('close', function (code) {
          return _this2.push(null);
        });
      }
      return this.proc;
    }
  }]);
  return ExecStream;
}(_stream.Duplex);

exports.default = ExecStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJlYW1zL2V4ZWMtc3RyZWFtLmpzIl0sIm5hbWVzIjpbIkV4ZWNTdHJlYW0iLCJjb21tYW5kIiwiY2h1bmsiLCJlbmNvZGluZyIsImNhbGxiYWNrIiwicHJvYyIsInN0ZGluIiwid3JpdGUiLCJzaXplIiwic3RkaW8iLCJzdGRvdXQiLCJvbiIsImRhdGEiLCJwdXNoIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUVNQSxVOzs7QUFDSixzQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUVuQixVQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFGbUI7QUFHcEI7Ozs7MkJBV01DLEssRUFBT0MsUSxFQUFVQyxRLEVBQVU7QUFDaEMsV0FBS0MsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxLQUFoQixDQUFzQkwsS0FBdEIsRUFBNkJDLFFBQTdCLEVBQXVDQyxRQUF2QztBQUNEOzs7MEJBRUtJLEksRUFBTTtBQUNWO0FBQ0EsV0FBS0gsSUFBTDtBQUNEOzs7d0JBaEJVO0FBQUE7O0FBQ1QsVUFBSSxDQUFDLEtBQUtBLElBQVYsRUFBZ0I7QUFDZCxhQUFLQSxJQUFMLEdBQVksMEJBQU0sU0FBTixFQUFpQixDQUFDLElBQUQsRUFBTyxLQUFLSixPQUFaLENBQWpCLEVBQXVDLEVBQUVRLE9BQU8sQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixRQUFqQixDQUFULEVBQXZDLENBQVo7QUFDQSxhQUFLSixJQUFMLENBQVVLLE1BQVYsQ0FBaUJDLEVBQWpCLENBQW9CLE1BQXBCLEVBQTRCLFVBQUNDLElBQUQ7QUFBQSxpQkFBVSxPQUFLQyxJQUFMLENBQVVELElBQVYsQ0FBVjtBQUFBLFNBQTVCO0FBQ0EsYUFBS1AsSUFBTCxDQUFVTSxFQUFWLENBQWEsT0FBYixFQUFzQixVQUFDRyxJQUFEO0FBQUEsaUJBQVUsT0FBS0QsSUFBTCxDQUFVLElBQVYsQ0FBVjtBQUFBLFNBQXRCO0FBQ0Q7QUFDRCxhQUFPLEtBQUtSLElBQVo7QUFDRDs7Ozs7a0JBWVlMLFUiLCJmaWxlIjoiZXhlYy1zdHJlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEdXBsZXggfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuY2xhc3MgRXhlY1N0cmVhbSBleHRlbmRzIER1cGxleCB7XG4gIGNvbnN0cnVjdG9yKGNvbW1hbmQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmQ7XG4gIH1cblxuICBnZXQgcHJvYygpIHtcbiAgICBpZiAoIXRoaXMucHJvYykge1xuICAgICAgdGhpcy5wcm9jID0gc3Bhd24oJy9iaW4vc2gnLCBbJy1jJywgdGhpcy5jb21tYW5kXSwgeyBzdGRpbzogWydwaXBlJywgJ3BpcGUnLCAnaWdub3JlJ10gfSk7XG4gICAgICB0aGlzLnByb2Muc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHRoaXMucHVzaChkYXRhKSk7XG4gICAgICB0aGlzLnByb2Mub24oJ2Nsb3NlJywgKGNvZGUpID0+IHRoaXMucHVzaChudWxsKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2M7XG4gIH1cblxuICBfd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICAgIHRoaXMucHJvYy5zdGRpbi53cml0ZShjaHVuaywgZW5jb2RpbmcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIF9yZWFkKHNpemUpIHtcbiAgICAvLyBqdXN0IHRyaWdnZXIgcHJvYyBjcmVhdGlvblxuICAgIHRoaXMucHJvYztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeGVjU3RyZWFtO1xuIl19