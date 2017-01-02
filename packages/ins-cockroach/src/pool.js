import pg from 'pg';
import { EventEmitter } from 'events';

import Client from './client';

class Pool extends EventEmitter {
  constructor(opts) {
    super();
    this.pool = new pg.Pool(opts);
  }

  async connect() {
    try {
      await this.pool.query('SELECT NOW()');
      this.emit('connected');
    } catch (err) {
      this.emit('error', err);
    }
  }

  close() {
    return this.pool.end();
  }

  queryRaw(sql, values) {
    if (typeof(sql) !== 'string' && sql.sql) {
      values = sql.values;
      sql = sql.sql;
    }

    return this.pool.query(sql, values);
  }

  async query(sql, values) {
    const { rows, fields } = await this.queryRaw(sql, values);
    return rows.map(r => {
      return fields.reduce((o, f) => {
        o[f.name] = r[f.name];
        return o;
      }, {});
    });
  }

  async queryFirst(sql, values) {
    return (await this.query(sql, values))[0];
  }

  async transaction(fn) {
    const client = new Client(await this.pool.connect(), true);

    const attempt = async () => {
      try {
        const result = await fn(client);
        await client.query('RELEASE SAVEPOINT cockroach_restart');
        return result;
      } catch (err) {
        if (err.code === '40001') {
          // retryable error
          await client.query('ROLLBACK TO SAVEPOINT cockroach_restart');
          return attempt();
        }
        throw err;
      }
    }

    try {
      await client.query('BEGIN; SAVEPOINT cockroach_restart');
      try {
        // will retry if necessary
        const result = await attempt();
        await client.query('COMMIT');
        return result;
      } catch (err) {
        client.query('ROLLBACK');
        throw err;
      }
    } finally {
      client.release();
    }
  }
}

export default Pool;
