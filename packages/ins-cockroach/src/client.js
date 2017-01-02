class Client {
  constructor(client, isTransaction = false) {
    this.client = client;
    this.isTransaction = isTransaction;
  }

  release() {
    return this.client.release();
  }

  queryRaw(sql, values) {
    if (typeof(sql) !== 'string' && sql.sql) {
      values = sql.values;
      sql = sql.sql;
    }

    return new Promise((resolve, reject) => {
      this.client.query(sql, values, (err, result) => {
        if (err) { return reject(err); }
        resolve(result);
      });
    });
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
}

export default Client;
