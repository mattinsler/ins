'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _nopt = require('nopt');

var _nopt2 = _interopRequireDefault(_nopt);

var _stream = require('stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEXT = 'TEXT';
var STREAM = 'STREAM';

function parse(message) {
  if (message[0] === 'C') {
    var match = /^C([0-9]{4}) ([0-9]+) (.+)$/.exec(message.trim());
    return {
      type: 'COPY',
      mode: parseInt(match[1], 8),
      size: parseInt(match[2]),
      filename: match[3]
    };
  } else if (message[0] === 'D') {
    throw new Error('Error: Directory transfers are not supported');
  }
}

var ScpStream = function (_Transform) {
  (0, _inherits3.default)(ScpStream, _Transform);
  (0, _createClass3.default)(ScpStream, null, [{
    key: 'isSCP',
    value: function isSCP(command) {
      return (/^scp /.test(command)
      );
    }
  }]);

  function ScpStream(command) {
    (0, _classCallCheck3.default)(this, ScpStream);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScpStream.__proto__ || (0, _getPrototypeOf2.default)(ScpStream)).call(this));

    var match = /-t +(.+)$/.exec(command);
    if (!match) {
      throw new Error('Command is not an incoming SCP request');
    }

    _this.target = match[1].trim();
    // console.log('new scp to file', this.target);

    _this.current = null;
    _this.output = [];

    _this.stage = TEXT;
    _this.ok();
    return _this;
  }

  (0, _createClass3.default)(ScpStream, [{
    key: 'ok',
    value: function ok() {
      // console.log('ok');
      this.push(new Buffer([0]));
    }
  }, {
    key: 'fatal',
    value: function fatal(message) {
      // console.log('fatal', message);
      this.push(Buffer.concat([new Buffer([0]), new Buffer(message), new Buffer([10])]));
      this.push(null);
    }
  }, {
    key: '_transform',
    value: function _transform(chunk, encoding, callback) {
      // console.log('_transform', chunk, encoding);

      if (this.stage === TEXT) {
        try {
          var message = parse(chunk.toString());
          // console.log(message);
          if (message.type === 'COPY') {
            this.current = {
              target: this.target,
              filename: message.filename,
              mode: message.mode,
              size: message.size,
              bytesWritten: 0,
              stream: new _stream.PassThrough()
            };
            this.emit('file', this.current);

            this.stage = STREAM;
            this.ok();
            callback();
          }
        } catch (err) {
          this.fatal(err.message);
        }
      } else if (this.stage === STREAM) {
        // console.log('stream data', chunk);

        var length = Buffer.byteLength(chunk);
        var bytesToRead = Math.min(length, this.current.size - this.current.bytesWritten);

        this.current.stream.write(chunk.slice(0, bytesToRead));
        this.current.bytesWritten += bytesToRead;

        if (this.current.bytesWritten === this.current.size) {
          this.current.stream.end();
          this.stage = TEXT;
        }

        this.ok();
        callback();
      }
    }
  }, {
    key: '_flush',
    value: function _flush(callback) {
      // console.log('_flush');
      callback();
    }
  }]);
  return ScpStream;
}(_stream.Transform);

exports.default = ScpStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJlYW1zL3NjcC1zdHJlYW0uanMiXSwibmFtZXMiOlsiVEVYVCIsIlNUUkVBTSIsInBhcnNlIiwibWVzc2FnZSIsIm1hdGNoIiwiZXhlYyIsInRyaW0iLCJ0eXBlIiwibW9kZSIsInBhcnNlSW50Iiwic2l6ZSIsImZpbGVuYW1lIiwiRXJyb3IiLCJTY3BTdHJlYW0iLCJjb21tYW5kIiwidGVzdCIsInRhcmdldCIsImN1cnJlbnQiLCJvdXRwdXQiLCJzdGFnZSIsIm9rIiwicHVzaCIsIkJ1ZmZlciIsImNvbmNhdCIsImNodW5rIiwiZW5jb2RpbmciLCJjYWxsYmFjayIsInRvU3RyaW5nIiwiYnl0ZXNXcml0dGVuIiwic3RyZWFtIiwiZW1pdCIsImVyciIsImZhdGFsIiwibGVuZ3RoIiwiYnl0ZUxlbmd0aCIsImJ5dGVzVG9SZWFkIiwiTWF0aCIsIm1pbiIsIndyaXRlIiwic2xpY2UiLCJlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sTUFBYjtBQUNBLElBQU1DLFNBQVMsUUFBZjs7QUFFQSxTQUFTQyxLQUFULENBQWVDLE9BQWYsRUFBd0I7QUFDdEIsTUFBSUEsUUFBUSxDQUFSLE1BQWUsR0FBbkIsRUFBd0I7QUFDdEIsUUFBTUMsUUFBUSw4QkFBOEJDLElBQTlCLENBQW1DRixRQUFRRyxJQUFSLEVBQW5DLENBQWQ7QUFDQSxXQUFPO0FBQ0xDLFlBQU0sTUFERDtBQUVMQyxZQUFNQyxTQUFTTCxNQUFNLENBQU4sQ0FBVCxFQUFtQixDQUFuQixDQUZEO0FBR0xNLFlBQU1ELFNBQVNMLE1BQU0sQ0FBTixDQUFULENBSEQ7QUFJTE8sZ0JBQVVQLE1BQU0sQ0FBTjtBQUpMLEtBQVA7QUFNRCxHQVJELE1BUU8sSUFBSUQsUUFBUSxDQUFSLE1BQWUsR0FBbkIsRUFBd0I7QUFDN0IsVUFBTSxJQUFJUyxLQUFKLENBQVUsOENBQVYsQ0FBTjtBQUNEO0FBQ0Y7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IjpbImltcG9ydCBub3B0IGZyb20gJ25vcHQnO1xuaW1wb3J0IHsgUGFzc1Rocm91Z2gsIFRyYW5zZm9ybSB9IGZyb20gJ3N0cmVhbSc7XG5cbmNvbnN0IFRFWFQgPSAnVEVYVCc7XG5jb25zdCBTVFJFQU0gPSAnU1RSRUFNJztcblxuZnVuY3Rpb24gcGFyc2UobWVzc2FnZSkge1xuICBpZiAobWVzc2FnZVswXSA9PT0gJ0MnKSB7XG4gICAgY29uc3QgbWF0Y2ggPSAvXkMoWzAtOV17NH0pIChbMC05XSspICguKykkLy5leGVjKG1lc3NhZ2UudHJpbSgpKTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0NPUFknLFxuICAgICAgbW9kZTogcGFyc2VJbnQobWF0Y2hbMV0sIDgpLFxuICAgICAgc2l6ZTogcGFyc2VJbnQobWF0Y2hbMl0pLFxuICAgICAgZmlsZW5hbWU6IG1hdGNoWzNdXG4gICAgfTtcbiAgfSBlbHNlIGlmIChtZXNzYWdlWzBdID09PSAnRCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yOiBEaXJlY3RvcnkgdHJhbnNmZXJzIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbn1cblxuY2xhc3MgU2NwU3RyZWFtIGV4dGVuZHMgVHJhbnNmb3JtIHtcbiAgc3RhdGljIGlzU0NQKGNvbW1hbmQpIHtcbiAgICByZXR1cm4gL15zY3AgLy50ZXN0KGNvbW1hbmQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY29tbWFuZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCBtYXRjaCA9IC8tdCArKC4rKSQvLmV4ZWMoY29tbWFuZCk7XG4gICAgaWYgKCFtYXRjaCkgeyB0aHJvdyBuZXcgRXJyb3IoJ0NvbW1hbmQgaXMgbm90IGFuIGluY29taW5nIFNDUCByZXF1ZXN0Jyk7IH1cblxuICAgIHRoaXMudGFyZ2V0ID0gbWF0Y2hbMV0udHJpbSgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCduZXcgc2NwIHRvIGZpbGUnLCB0aGlzLnRhcmdldCk7XG5cbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuICAgIHRoaXMub3V0cHV0ID0gW107XG5cbiAgICB0aGlzLnN0YWdlID0gVEVYVDtcbiAgICB0aGlzLm9rKCk7XG4gIH1cblxuICBvaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnb2snKTtcbiAgICB0aGlzLnB1c2gobmV3IEJ1ZmZlcihbMF0pKTtcbiAgfVxuXG4gIGZhdGFsKG1lc3NhZ2UpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnZmF0YWwnLCBtZXNzYWdlKTtcbiAgICB0aGlzLnB1c2goQnVmZmVyLmNvbmNhdChbbmV3IEJ1ZmZlcihbMF0pLCBuZXcgQnVmZmVyKG1lc3NhZ2UpLCBuZXcgQnVmZmVyKFsxMF0pXSkpO1xuICAgIHRoaXMucHVzaChudWxsKTtcbiAgfVxuXG4gIF90cmFuc2Zvcm0oY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICAgIC8vIGNvbnNvbGUubG9nKCdfdHJhbnNmb3JtJywgY2h1bmssIGVuY29kaW5nKTtcblxuICAgIGlmICh0aGlzLnN0YWdlID09PSBURVhUKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gcGFyc2UoY2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSAnQ09QWScpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0LFxuICAgICAgICAgICAgZmlsZW5hbWU6IG1lc3NhZ2UuZmlsZW5hbWUsXG4gICAgICAgICAgICBtb2RlOiBtZXNzYWdlLm1vZGUsXG4gICAgICAgICAgICBzaXplOiBtZXNzYWdlLnNpemUsXG4gICAgICAgICAgICBieXRlc1dyaXR0ZW46IDAsXG4gICAgICAgICAgICBzdHJlYW06IG5ldyBQYXNzVGhyb3VnaCgpXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2ZpbGUnLCB0aGlzLmN1cnJlbnQpO1xuXG4gICAgICAgICAgdGhpcy5zdGFnZSA9IFNUUkVBTTtcbiAgICAgICAgICB0aGlzLm9rKCk7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuZmF0YWwoZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGFnZSA9PT0gU1RSRUFNKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3RyZWFtIGRhdGEnLCBjaHVuayk7XG5cbiAgICAgIGNvbnN0IGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGNodW5rKTtcbiAgICAgIGNvbnN0IGJ5dGVzVG9SZWFkID0gTWF0aC5taW4obGVuZ3RoLCB0aGlzLmN1cnJlbnQuc2l6ZSAtIHRoaXMuY3VycmVudC5ieXRlc1dyaXR0ZW4pO1xuXG4gICAgICB0aGlzLmN1cnJlbnQuc3RyZWFtLndyaXRlKGNodW5rLnNsaWNlKDAsIGJ5dGVzVG9SZWFkKSk7XG4gICAgICB0aGlzLmN1cnJlbnQuYnl0ZXNXcml0dGVuICs9IGJ5dGVzVG9SZWFkO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50LmJ5dGVzV3JpdHRlbiA9PT0gdGhpcy5jdXJyZW50LnNpemUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50LnN0cmVhbS5lbmQoKTtcbiAgICAgICAgdGhpcy5zdGFnZSA9IFRFWFQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub2soKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgX2ZsdXNoKGNhbGxiYWNrKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ19mbHVzaCcpO1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NwU3RyZWFtO1xuIl19