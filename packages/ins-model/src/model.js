import merge from 'lodash.merge';
import Statement from './statement';

const debug = require('debug')('ins-model');

class Model {
  static connection = null;

  static insert(client, model, data) {
    const stmt = Statement.insert(model, data);
    debug(Statement.debug('INSERT', stmt));
    return client[stmt.isMulti ? 'query' : 'queryFirst'](stmt);
  }

  static raw(client, model, sql, values) {
    if (typeof(sql) !== 'string' && sql.sql) {
      values = sql.values;
      sql = sql.sql;
    }

    if (typeof(sql) === 'function') {
      sql = sql(model.tableName);
    } else if (typeof(sql) !== 'string') {
      throw new Error('Model.raw: Illegal arguments');
    }

    return {
      array() {
        debug(Statement.debug('RAW', { sql, values }));
        return client.query(sql, values);
      },
      first() {
        debug(Statement.debug('RAW', { sql, values }));
        return client.queryFirst(sql, values);
      }
    }
  }

  static where(client, model) {
    const clauses = {};

    const modifiers = {
      array() {
        const stmt = Statement.read(model, clauses);
        return client.query(stmt);
      },
      first() {
        const stmt = Statement.read(model, clauses);
        return client.queryFirst(stmt);
      },
      async count() {
        const stmt = Statement.read(model, clauses, ['COUNT(1) AS "count"']);
        return (await client.queryFirst(stmt))['count'];
      },
      where(clause) {
        merge(clauses, clause);
        return modifiers;
      }
    };

    return modifiers;
  }

  // decorator to inject the client as the first argument of a method
  static query({ transaction } = { transaction: false }) {
    return function(target, key, { writeable, enumerable, configurable }) {
      const fn = target[key];

      return {
        writeable,
        enumerable,
        configurable,
        value(...args) {
          let client;
          if (
            args[0] &&
            typeof(args[0].query) === 'function' &&
            typeof(args[0].queryFirst) === 'function'
          ) {
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
                return fn(client, ...args);
              } else if (typeof(client.transaction) === 'function') {
                // can start transaction
                return client.transaction(txnClient => fn(txnClient, ...args));
              } else {
                throw new Error(`${target}::${key} txn ???`);
              }
            } else {
              return Model.connection.transaction(txnClient => fn(txnClient, ...args));
            }
          } else {
            return fn(client || Model.connection, ...args);
          }
        }
      };
    }
  }
}

export default Model;

// const stmt = Statement.insert(this, data);
// console.log(stmt);
// return Model.connection[stmt.isMulti ? 'query' : 'queryFirst'](stmt);
// return Model.connection.queryFirst(stmt);
