'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = function () {
  function Client(client) {
    var isTransaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _classCallCheck3.default)(this, Client);

    this.client = client;
    this.isTransaction = isTransaction;
  }

  (0, _createClass3.default)(Client, [{
    key: 'release',
    value: function release() {
      return this.client.release();
    }
  }, {
    key: 'queryRaw',
    value: function queryRaw(sql, values) {
      var _this = this;

      if (typeof sql !== 'string' && sql.sql) {
        values = sql.values;
        sql = sql.sql;
      }

      return new _promise2.default(function (resolve, reject) {
        _this.client.query(sql, values, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }
  }, {
    key: 'query',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(sql, values) {
        var _ref2, rows, fields;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.queryRaw(sql, values);

              case 2:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                fields = _ref2.fields;
                return _context.abrupt('return', rows.map(function (r) {
                  return fields.reduce(function (o, f) {
                    o[f.name] = r[f.name];
                    return o;
                  }, {});
                }));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function query(_x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return query;
    }()
  }, {
    key: 'queryFirst',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(sql, values) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.query(sql, values);

              case 2:
                return _context2.abrupt('return', _context2.sent[0]);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function queryFirst(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return queryFirst;
    }()
  }]);
  return Client;
}();

exports.default = Client;