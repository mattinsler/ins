'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _events = require('events');

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pool = function (_EventEmitter) {
  (0, _inherits3.default)(Pool, _EventEmitter);

  function Pool(opts) {
    (0, _classCallCheck3.default)(this, Pool);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Pool.__proto__ || (0, _getPrototypeOf2.default)(Pool)).call(this));

    _this.pool = new _pg2.default.Pool(opts);
    return _this;
  }

  (0, _createClass3.default)(Pool, [{
    key: 'connect',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.pool.query('SELECT NOW()');

              case 3:
                this.emit('connected');
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);

                this.emit('error', _context.t0);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'close',
    value: function close() {
      return this.pool.end();
    }
  }, {
    key: 'queryRaw',
    value: function queryRaw(sql, values) {
      if (typeof sql !== 'string' && sql.sql) {
        values = sql.values;
        sql = sql.sql;
      }

      return this.pool.query(sql, values);
    }
  }, {
    key: 'query',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(sql, values) {
        var _ref3, rows, fields;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.queryRaw(sql, values);

              case 2:
                _ref3 = _context2.sent;
                rows = _ref3.rows;
                fields = _ref3.fields;
                return _context2.abrupt('return', rows.map(function (r) {
                  return fields.reduce(function (o, f) {
                    o[f.name] = r[f.name];
                    return o;
                  }, {});
                }));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function query(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return query;
    }()
  }, {
    key: 'queryFirst',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(sql, values) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.query(sql, values);

              case 2:
                return _context3.abrupt('return', _context3.sent[0]);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function queryFirst(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return queryFirst;
    }()
  }, {
    key: 'transaction',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(fn) {
        var _this2 = this;

        var client, attempt, result;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = _client2.default;
                _context5.next = 3;
                return this.pool.connect();

              case 3:
                _context5.t1 = _context5.sent;
                client = new _context5.t0(_context5.t1, true);

                attempt = function () {
                  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                    var result;
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.prev = 0;
                            _context4.next = 3;
                            return fn(client);

                          case 3:
                            result = _context4.sent;
                            _context4.next = 6;
                            return client.query('RELEASE SAVEPOINT cockroach_restart');

                          case 6:
                            return _context4.abrupt('return', result);

                          case 9:
                            _context4.prev = 9;
                            _context4.t0 = _context4['catch'](0);

                            if (!(_context4.t0.code === '40001')) {
                              _context4.next = 15;
                              break;
                            }

                            _context4.next = 14;
                            return client.query('ROLLBACK TO SAVEPOINT cockroach_restart');

                          case 14:
                            return _context4.abrupt('return', attempt());

                          case 15:
                            throw _context4.t0;

                          case 16:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this2, [[0, 9]]);
                  }));

                  return function attempt() {
                    return _ref6.apply(this, arguments);
                  };
                }();

                _context5.prev = 6;
                _context5.next = 9;
                return client.query('BEGIN; SAVEPOINT cockroach_restart');

              case 9:
                _context5.prev = 9;
                _context5.next = 12;
                return attempt();

              case 12:
                result = _context5.sent;
                _context5.next = 15;
                return client.query('COMMIT');

              case 15:
                return _context5.abrupt('return', result);

              case 18:
                _context5.prev = 18;
                _context5.t2 = _context5['catch'](9);

                client.query('ROLLBACK');
                throw _context5.t2;

              case 22:
                _context5.prev = 22;

                client.release();
                return _context5.finish(22);

              case 25:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[6,, 22, 25], [9, 18]]);
      }));

      function transaction(_x5) {
        return _ref5.apply(this, arguments);
      }

      return transaction;
    }()
  }]);
  return Pool;
}(_events.EventEmitter);

exports.default = Pool;