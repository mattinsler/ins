'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = require('chalk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripLeadingSpace(v) {
  var leadingSpace = -1;
  var lines = v.split('\n');

  return lines.map(function (line) {
    if (leadingSpace === -1 && line.trim()) {
      leadingSpace = /^ */.exec(line)[0].length;
    }
    return leadingSpace === -1 ? line : line.replace(new RegExp('^ {' + leadingSpace + '}'), '');
  }).join('\n').trim();
}

var Statement = function () {
  function Statement() {
    (0, _classCallCheck3.default)(this, Statement);
  }

  (0, _createClass3.default)(Statement, null, [{
    key: 'aliasField',
    value: function aliasField(alias, field) {
      var match = field.match(/\(([^\)]*)\)/);
      if (match) {
        return field.replace(match[0], '(' + alias + '."' + match[1] + '")');
      }
      return alias + '."' + field + '"';
    }
  }, {
    key: 'selectFields',
    value: function selectFields(tableAlias, fields) {
      return fields.reduce(function (arr, f) {
        if (typeof f === 'string') {
          arr.push(Statement.aliasField(tableAlias, f));
        } else {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(f)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                  to = _step$value[0],
                  from = _step$value[1];

              arr.push(Statement.aliasField(tableAlias, from) + ' AS "' + to + '"');
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        return arr;
      }, []).join(',');
    }
  }, {
    key: 'groupFields',
    value: function groupFields(tableAlias, fields) {
      return fields.reduce(function (arr, f) {
        if (typeof f === 'string') {
          arr.push(Statement.aliasField(tableAlias, f));
        } else {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)((0, _values2.default)(f)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var to = _step2.value;

              arr.push(Statement.aliasField(tableAlias, to));
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        return arr;
      }, []).join(',');
    }
  }, {
    key: 'whereClause',
    value: function whereClause(tableAlias, clauses) {
      if (typeof tableAlias !== 'string') {
        clauses = tableAlias;
        tableAlias = '';
      }

      if ((0, _keys2.default)(clauses).length === 0) {
        return { sql: '', values: [] };
      }

      var values = [];
      var columns = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)((0, _entries2.default)(clauses)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2),
              k = _step3$value[0],
              v = _step3$value[1];

          values.push(v);
          columns.push((tableAlias ? tableAlias + '.' : '') + '"' + k + '" = $' + values.length);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return {
        sql: 'WHERE ' + columns.join(' AND '),
        values: values
      };
    }
  }, {
    key: 'insert',
    value: function insert(model, data) {
      var isMulti = Array.isArray(data);
      var columns = void 0,
          dataValues = void 0;

      if (isMulti) {
        columns = (0, _keys2.default)(data[0]).map(function (c) {
          return '"' + c + '"';
        }).join(',');
        dataValues = data.map(function (v) {
          return (0, _values2.default)(v);
        });
      } else {
        columns = (0, _keys2.default)(data).map(function (c) {
          return '"' + c + '"';
        }).join(',');
        dataValues = [(0, _values2.default)(data)];
      }

      var values = [];
      var markers = [];

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(dataValues), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var row = _step4.value;

          var rowMarkers = [];

          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = (0, _getIterator3.default)(row), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var v = _step5.value;

              if (typeof v === 'string' && /\([^\)]*\)/.test(v)) {
                rowMarkers.push(v);
              } else {
                values.push(v);
                rowMarkers.push('$' + values.length);
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          markers.push('(' + rowMarkers.join(',') + ')');
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return {
        isMulti: isMulti,
        sql: 'INSERT INTO "' + model.tableName + '" (' + columns + ') VALUES ' + markers.join(',') + ' RETURNING *',
        values: values
      };
    }
  }, {
    key: 'read',
    value: function read(model) {
      var clauses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (fields.length === 0) {
        fields = ['*'];
      }

      var where = this.whereClause(clauses);

      var sql = 'SELECT ' + fields.join(',') + ' FROM ' + model.tableName;
      if (where.sql) {
        sql += ' ' + where.sql;
      }

      return { sql: sql, values: where.values };
    }
  }, {
    key: 'debug',
    value: function debug(operation, _ref) {
      var sql = _ref.sql,
          values = _ref.values;

      var arr = [(0, _chalk.bold)('===== ' + operation + ' ====='), (0, _chalk.magenta)('SQL'), stripLeadingSpace(sql)];

      if (values != null) {
        arr.push((0, _chalk.magenta)('VALUES'), (0, _stringify2.default)(values));
      }

      return arr.join('\n');
    }
  }]);
  return Statement;
}();

exports.default = Statement;