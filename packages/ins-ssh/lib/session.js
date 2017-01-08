'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Session = function () {
  function Session(server, client, session) {
    (0, _classCallCheck3.default)(this, Session);

    this.server = server;
    this.client = client;
    this.session = session;

    // console.log({
    //   remoteAddress: client._sock.remoteAddress,
    //   remotePort: client._sock.remotePort
    // });
  }

  (0, _createClass3.default)(Session, [{
    key: 'start',
    value: function start() {
      var _this = this;

      var rows = void 0,
          cols = void 0,
          term = void 0;
      var env = {};

      this.session.on('pty', function (accept, reject, info) {
        rows = info.rows;
        cols = info.cols;
        term = info.term;
        accept();
      });

      this.session.on('env', function (accept, reject, info) {
        (0, _assign2.default)(env, info);
      });

      this.session.on('shell', function (accept, reject) {
        if (!_this.server.onShell) {
          return reject();
        }
        _this.server.onShell({
          client: _this.client,
          session: _this.session,
          accept: accept,
          reject: reject
        });
      });

      this.session.on('exec', function (accept, reject, _ref) {
        var command = _ref.command;

        if (!_this.server.onExec) {
          return reject();
        }
        _this.server.onExec({
          client: _this.client,
          session: _this.session,
          accept: accept,
          reject: reject,
          command: command
        });
      });
    }

    // onSession = (accept, reject) => {
    //   const session = accept();
    //
    //   let rows, cols, term;
    //   const env = {};
    //
    //   session.on('pty', (accept, reject, info) => {
    //     console.log('pty');
    //     // console.log(info);
    //     rows = info.rows;
    //     cols = info.cols;
    //     term = info.term;
    //     accept();
    //   });
    //
    //   session.on('env', (accept, reject, info) => {
    //     console.log('env');
    //     Object.assign(env, info);
    //   });
    //
    //   session.on('shell', (accept, reject) => {
    //     console.log('shell');
    //
    //     container.attach({
    //       stream: true,
    //       stdout: true,
    //       stdin: true,
    //       tty: true
    //     }, (err, containerStream) => {
    //       if (err) { return reject(err); }
    //
    //       const stream = accept();
    //
    //       stream.pipe(containerStream).pipe(stream);
    //
    //       stream.once('close', () => {
    //         console.log('STREAM closed');
    //       });
    //     });
    //
    //     // stream.on('data', (data) => {
    //     //   console.log('STREAM', data);
    //     //   stream.write(data);
    //     // });
    //   });
    //
    //
    //   [
    //     'window-change', 'x11', 'signal',
    //     'auth-agent', 'exec', 'sftp', 'subsystem', 'close'
    //   ].forEach(e => {
    //     session.on(e, (...args) => console.log(e, args));
    //   });
    //
    //   //     client.on('session', function(accept, reject) {
    //   //       const session = accept();
    //   //
    //   //
    //   //       var session = accept();
    //   //       session.once('exec', function(accept, reject, info) {
    //   //         console.log('Client wants to execute: ' + inspect(info.command));
    //   //         var stream = accept();
    //   //         stream.stderr.write('Oh no, the dreaded errors!\n');
    //   //         stream.write('Just kidding about the errors!\n');
    //   //         stream.exit(0);
    //   //         stream.end();
    //   //       });
    //   //     });
    //
    // }

  }]);
  return Session;
}();

exports.default = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXNzaW9uLmpzIl0sIm5hbWVzIjpbIlNlc3Npb24iLCJzZXJ2ZXIiLCJjbGllbnQiLCJzZXNzaW9uIiwicm93cyIsImNvbHMiLCJ0ZXJtIiwiZW52Iiwib24iLCJhY2NlcHQiLCJyZWplY3QiLCJpbmZvIiwib25TaGVsbCIsImNvbW1hbmQiLCJvbkV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLE87QUFDSixtQkFBWUMsTUFBWixFQUFvQkMsTUFBcEIsRUFBNEJDLE9BQTVCLEVBQXFDO0FBQUE7O0FBQ25DLFNBQUtGLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7OzRCQUVPO0FBQUE7O0FBQ04sVUFBSUMsYUFBSjtBQUFBLFVBQVVDLGFBQVY7QUFBQSxVQUFnQkMsYUFBaEI7QUFDQSxVQUFNQyxNQUFNLEVBQVo7O0FBRUEsV0FBS0osT0FBTCxDQUFhSyxFQUFiLENBQWdCLEtBQWhCLEVBQXVCLFVBQUNDLE1BQUQsRUFBU0MsTUFBVCxFQUFpQkMsSUFBakIsRUFBMEI7QUFDL0NQLGVBQU9PLEtBQUtQLElBQVo7QUFDQUMsZUFBT00sS0FBS04sSUFBWjtBQUNBQyxlQUFPSyxLQUFLTCxJQUFaO0FBQ0FHO0FBQ0QsT0FMRDs7QUFPQSxXQUFLTixPQUFMLENBQWFLLEVBQWIsQ0FBZ0IsS0FBaEIsRUFBdUIsVUFBQ0MsTUFBRCxFQUFTQyxNQUFULEVBQWlCQyxJQUFqQixFQUEwQjtBQUMvQyw4QkFBY0osR0FBZCxFQUFtQkksSUFBbkI7QUFDRCxPQUZEOztBQUlBLFdBQUtSLE9BQUwsQ0FBYUssRUFBYixDQUFnQixPQUFoQixFQUF5QixVQUFDQyxNQUFELEVBQVNDLE1BQVQsRUFBb0I7QUFDM0MsWUFBSSxDQUFDLE1BQUtULE1BQUwsQ0FBWVcsT0FBakIsRUFBMEI7QUFBRSxpQkFBT0YsUUFBUDtBQUFrQjtBQUM5QyxjQUFLVCxNQUFMLENBQVlXLE9BQVosQ0FBb0I7QUFDbEJWLGtCQUFRLE1BQUtBLE1BREs7QUFFbEJDLG1CQUFTLE1BQUtBLE9BRkk7QUFHbEJNLHdCQUhrQjtBQUlsQkM7QUFKa0IsU0FBcEI7QUFNRCxPQVJEOztBQVVBLFdBQUtQLE9BQUwsQ0FBYUssRUFBYixDQUFnQixNQUFoQixFQUF3QixVQUFDQyxNQUFELEVBQVNDLE1BQVQsUUFBaUM7QUFBQSxZQUFkRyxPQUFjLFFBQWRBLE9BQWM7O0FBQ3ZELFlBQUksQ0FBQyxNQUFLWixNQUFMLENBQVlhLE1BQWpCLEVBQXlCO0FBQUUsaUJBQU9KLFFBQVA7QUFBa0I7QUFDN0MsY0FBS1QsTUFBTCxDQUFZYSxNQUFaLENBQW1CO0FBQ2pCWixrQkFBUSxNQUFLQSxNQURJO0FBRWpCQyxtQkFBUyxNQUFLQSxPQUZHO0FBR2pCTSx3QkFIaUI7QUFJakJDLHdCQUppQjtBQUtqQkc7QUFMaUIsU0FBbkI7QUFPRCxPQVREO0FBVUQ7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztrQkFHYWIsTyIsImZpbGUiOiJzZXNzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2Vzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHNlcnZlciwgY2xpZW50LCBzZXNzaW9uKSB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcblxuICAgIC8vIGNvbnNvbGUubG9nKHtcbiAgICAvLyAgIHJlbW90ZUFkZHJlc3M6IGNsaWVudC5fc29jay5yZW1vdGVBZGRyZXNzLFxuICAgIC8vICAgcmVtb3RlUG9ydDogY2xpZW50Ll9zb2NrLnJlbW90ZVBvcnRcbiAgICAvLyB9KTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGxldCByb3dzLCBjb2xzLCB0ZXJtO1xuICAgIGNvbnN0IGVudiA9IHt9O1xuXG4gICAgdGhpcy5zZXNzaW9uLm9uKCdwdHknLCAoYWNjZXB0LCByZWplY3QsIGluZm8pID0+IHtcbiAgICAgIHJvd3MgPSBpbmZvLnJvd3M7XG4gICAgICBjb2xzID0gaW5mby5jb2xzO1xuICAgICAgdGVybSA9IGluZm8udGVybTtcbiAgICAgIGFjY2VwdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXNzaW9uLm9uKCdlbnYnLCAoYWNjZXB0LCByZWplY3QsIGluZm8pID0+IHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZW52LCBpbmZvKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2Vzc2lvbi5vbignc2hlbGwnLCAoYWNjZXB0LCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdGhpcy5zZXJ2ZXIub25TaGVsbCkgeyByZXR1cm4gcmVqZWN0KCk7IH1cbiAgICAgIHRoaXMuc2VydmVyLm9uU2hlbGwoe1xuICAgICAgICBjbGllbnQ6IHRoaXMuY2xpZW50LFxuICAgICAgICBzZXNzaW9uOiB0aGlzLnNlc3Npb24sXG4gICAgICAgIGFjY2VwdCxcbiAgICAgICAgcmVqZWN0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2Vzc2lvbi5vbignZXhlYycsIChhY2NlcHQsIHJlamVjdCwgeyBjb21tYW5kIH0pID0+IHtcbiAgICAgIGlmICghdGhpcy5zZXJ2ZXIub25FeGVjKSB7IHJldHVybiByZWplY3QoKTsgfVxuICAgICAgdGhpcy5zZXJ2ZXIub25FeGVjKHtcbiAgICAgICAgY2xpZW50OiB0aGlzLmNsaWVudCxcbiAgICAgICAgc2Vzc2lvbjogdGhpcy5zZXNzaW9uLFxuICAgICAgICBhY2NlcHQsXG4gICAgICAgIHJlamVjdCxcbiAgICAgICAgY29tbWFuZFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBvblNlc3Npb24gPSAoYWNjZXB0LCByZWplY3QpID0+IHtcbiAgLy8gICBjb25zdCBzZXNzaW9uID0gYWNjZXB0KCk7XG4gIC8vXG4gIC8vICAgbGV0IHJvd3MsIGNvbHMsIHRlcm07XG4gIC8vICAgY29uc3QgZW52ID0ge307XG4gIC8vXG4gIC8vICAgc2Vzc2lvbi5vbigncHR5JywgKGFjY2VwdCwgcmVqZWN0LCBpbmZvKSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZygncHR5Jyk7XG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhpbmZvKTtcbiAgLy8gICAgIHJvd3MgPSBpbmZvLnJvd3M7XG4gIC8vICAgICBjb2xzID0gaW5mby5jb2xzO1xuICAvLyAgICAgdGVybSA9IGluZm8udGVybTtcbiAgLy8gICAgIGFjY2VwdCgpO1xuICAvLyAgIH0pO1xuICAvL1xuICAvLyAgIHNlc3Npb24ub24oJ2VudicsIChhY2NlcHQsIHJlamVjdCwgaW5mbykgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2coJ2VudicpO1xuICAvLyAgICAgT2JqZWN0LmFzc2lnbihlbnYsIGluZm8pO1xuICAvLyAgIH0pO1xuICAvL1xuICAvLyAgIHNlc3Npb24ub24oJ3NoZWxsJywgKGFjY2VwdCwgcmVqZWN0KSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZygnc2hlbGwnKTtcbiAgLy9cbiAgLy8gICAgIGNvbnRhaW5lci5hdHRhY2goe1xuICAvLyAgICAgICBzdHJlYW06IHRydWUsXG4gIC8vICAgICAgIHN0ZG91dDogdHJ1ZSxcbiAgLy8gICAgICAgc3RkaW46IHRydWUsXG4gIC8vICAgICAgIHR0eTogdHJ1ZVxuICAvLyAgICAgfSwgKGVyciwgY29udGFpbmVyU3RyZWFtKSA9PiB7XG4gIC8vICAgICAgIGlmIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9XG4gIC8vXG4gIC8vICAgICAgIGNvbnN0IHN0cmVhbSA9IGFjY2VwdCgpO1xuICAvL1xuICAvLyAgICAgICBzdHJlYW0ucGlwZShjb250YWluZXJTdHJlYW0pLnBpcGUoc3RyZWFtKTtcbiAgLy9cbiAgLy8gICAgICAgc3RyZWFtLm9uY2UoJ2Nsb3NlJywgKCkgPT4ge1xuICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdTVFJFQU0gY2xvc2VkJyk7XG4gIC8vICAgICAgIH0pO1xuICAvLyAgICAgfSk7XG4gIC8vXG4gIC8vICAgICAvLyBzdHJlYW0ub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAvLyAgICAgLy8gICBjb25zb2xlLmxvZygnU1RSRUFNJywgZGF0YSk7XG4gIC8vICAgICAvLyAgIHN0cmVhbS53cml0ZShkYXRhKTtcbiAgLy8gICAgIC8vIH0pO1xuICAvLyAgIH0pO1xuICAvL1xuICAvL1xuICAvLyAgIFtcbiAgLy8gICAgICd3aW5kb3ctY2hhbmdlJywgJ3gxMScsICdzaWduYWwnLFxuICAvLyAgICAgJ2F1dGgtYWdlbnQnLCAnZXhlYycsICdzZnRwJywgJ3N1YnN5c3RlbScsICdjbG9zZSdcbiAgLy8gICBdLmZvckVhY2goZSA9PiB7XG4gIC8vICAgICBzZXNzaW9uLm9uKGUsICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZyhlLCBhcmdzKSk7XG4gIC8vICAgfSk7XG4gIC8vXG4gIC8vICAgLy8gICAgIGNsaWVudC5vbignc2Vzc2lvbicsIGZ1bmN0aW9uKGFjY2VwdCwgcmVqZWN0KSB7XG4gIC8vICAgLy8gICAgICAgY29uc3Qgc2Vzc2lvbiA9IGFjY2VwdCgpO1xuICAvLyAgIC8vXG4gIC8vICAgLy9cbiAgLy8gICAvLyAgICAgICB2YXIgc2Vzc2lvbiA9IGFjY2VwdCgpO1xuICAvLyAgIC8vICAgICAgIHNlc3Npb24ub25jZSgnZXhlYycsIGZ1bmN0aW9uKGFjY2VwdCwgcmVqZWN0LCBpbmZvKSB7XG4gIC8vICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnQ2xpZW50IHdhbnRzIHRvIGV4ZWN1dGU6ICcgKyBpbnNwZWN0KGluZm8uY29tbWFuZCkpO1xuICAvLyAgIC8vICAgICAgICAgdmFyIHN0cmVhbSA9IGFjY2VwdCgpO1xuICAvLyAgIC8vICAgICAgICAgc3RyZWFtLnN0ZGVyci53cml0ZSgnT2ggbm8sIHRoZSBkcmVhZGVkIGVycm9ycyFcXG4nKTtcbiAgLy8gICAvLyAgICAgICAgIHN0cmVhbS53cml0ZSgnSnVzdCBraWRkaW5nIGFib3V0IHRoZSBlcnJvcnMhXFxuJyk7XG4gIC8vICAgLy8gICAgICAgICBzdHJlYW0uZXhpdCgwKTtcbiAgLy8gICAvLyAgICAgICAgIHN0cmVhbS5lbmQoKTtcbiAgLy8gICAvLyAgICAgICB9KTtcbiAgLy8gICAvLyAgICAgfSk7XG4gIC8vXG4gIC8vIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2Vzc2lvbjtcbiJdfQ==