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