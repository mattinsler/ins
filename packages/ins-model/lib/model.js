'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _statement = require('./statement');

var _statement2 = _interopRequireDefault(_statement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('ins-model');

var Model = (_temp = _class = function () {
  function Model() {
    (0, _classCallCheck3.default)(this, Model);
  }

  (0, _createClass3.default)(Model, null, [{
    key: 'insert',
    value: function insert(client, model, data) {
      var stmt = _statement2.default.insert(model, data);
      debug(_statement2.default.debug('INSERT', stmt));
      return client[stmt.isMulti ? 'query' : 'queryFirst'](stmt);
    }
  }, {
    key: 'raw',
    value: function raw(client, model, sql, values) {
      if (typeof sql !== 'string' && sql.sql) {
        values = sql.values;
        sql = sql.sql;
      }

      if (typeof sql === 'function') {
        sql = sql(model.tableName);
      } else if (typeof sql !== 'string') {
        throw new Error('Model.raw: Illegal arguments');
      }

      return {
        array: function array() {
          debug(_statement2.default.debug('RAW', { sql: sql, values: values }));
          return client.query(sql, values);
        },
        first: function first() {
          debug(_statement2.default.debug('RAW', { sql: sql, values: values }));
          return client.queryFirst(sql, values);
        }
      };
    }
  }, {
    key: 'where',
    value: function where(client, model) {
      var clauses = {};

      var modifiers = {
        array: function array() {
          var stmt = _statement2.default.read(model, clauses);
          return client.query(stmt);
        },
        first: function first() {
          var stmt = _statement2.default.read(model, clauses);
          return client.queryFirst(stmt);
        },
        count: function count() {
          var _this = this;

          return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var stmt;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    stmt = _statement2.default.read(model, clauses, ['COUNT(1) AS "count"']);
                    _context.next = 3;
                    return client.queryFirst(stmt);

                  case 3:
                    return _context.abrupt('return', _context.sent['count']);

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }))();
        },
        where: function where(clause) {
          (0, _lodash2.default)(clauses, clause);
          return modifiers;
        }
      };

      return modifiers;
    }

    // decorator to inject the client as the first argument of a method

  }, {
    key: 'query',
    value: function query() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { transaction: false },
          transaction = _ref.transaction;

      return function (target, key, _ref2) {
        var writeable = _ref2.writeable,
            enumerable = _ref2.enumerable,
            configurable = _ref2.configurable;

        var fn = target[key];

        return {
          writeable: writeable,
          enumerable: enumerable,
          configurable: configurable,
          value: function value() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var client = void 0;
            if (args[0] && typeof args[0].query === 'function' && typeof args[0].queryFirst === 'function') {
              client = args[0];
              args.shift();
            }

            if (!client && Model.connection === null) {
              throw new Error('Not connected');
            }

            if (transaction) {
              if (client) {
                if (client.isTransaction) {
                  // already in a transaction
                  return fn.apply(undefined, [client].concat(args));
                } else if (typeof client.transaction === 'function') {
                  // can start transaction
                  return client.transaction(function (txnClient) {
                    return fn.apply(undefined, [txnClient].concat(args));
                  });
                } else {
                  throw new Error(target + '::' + key + ' txn ???');
                }
              } else {
                return Model.connection.transaction(function (txnClient) {
                  return fn.apply(undefined, [txnClient].concat(args));
                });
              }
            } else {
              return fn.apply(undefined, [client || Model.connection].concat(args));
            }
          }
        };
      };
    }
  }]);
  return Model;
}(), _class.connection = null, _temp);
exports.default = Model;

// const stmt = Statement.insert(this, data);
// console.log(stmt);
// return Model.connection[stmt.isMulti ? 'query' : 'queryFirst'](stmt);
// return Model.connection.queryFirst(stmt);