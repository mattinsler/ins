import { bold, magenta } from 'chalk';

function stripLeadingSpace(v) {
  let leadingSpace = -1;
  const lines = v.split('\n');

  return lines.map(line => {
    if (leadingSpace === -1 && line.trim()) {
      leadingSpace = /^ */.exec(line)[0].length;
    }
    return leadingSpace === -1 ? line : line.replace(new RegExp(`^ {${leadingSpace}}`), '');
  }).join('\n').trim();
}

class Statement {
  static aliasField(alias, field) {
    const match = field.match(/\(([^\)]*)\)/);
    if (match) {
      return field.replace(match[0], `(${alias}."${match[1]}")`);
    }
    return `${alias}."${field}"`;
  }

  static selectFields(tableAlias, fields) {
    return fields.reduce((arr, f) => {
      if (typeof(f) === 'string') {
        arr.push(Statement.aliasField(tableAlias, f));
      } else {
        for (let [to, from] of Object.entries(f)) {
          arr.push(`${Statement.aliasField(tableAlias, from)} AS "${to}"`);
        }
      }

      return arr;
    }, []).join(',');
  }

  static groupFields(tableAlias, fields) {
    return fields.reduce((arr, f) => {
      if (typeof(f) === 'string') {
        arr.push(Statement.aliasField(tableAlias, f));
      } else {
        for (let to of Object.values(f)) {
          arr.push(Statement.aliasField(tableAlias, to));
        }
      }

      return arr;
    }, []).join(',');
  }

  static whereClause(tableAlias, clauses) {
    if (typeof(tableAlias) !== 'string') {
      clauses = tableAlias;
      tableAlias = '';
    }

    if (Object.keys(clauses).length === 0) { return { sql: '', values: [] }; }

    const values = [];
    const columns = [];

    for (let [k, v] of Object.entries(clauses)) {
      values.push(v);
      columns.push(`${tableAlias ? tableAlias + '.' : ''}"${k}" = $${values.length}`);
    }

    return {
      sql: `WHERE ${columns.join(' AND ')}`,
      values
    };
  }

  static insert(model, data) {
    const isMulti = Array.isArray(data);
    let columns, dataValues;

    if (isMulti) {
      columns = Object.keys(data[0]).map(c => `"${c}"`).join(',');
      dataValues = data.map(v => Object.values(v));
    } else {
      columns = Object.keys(data).map(c => `"${c}"`).join(',');
      dataValues = [Object.values(data)];
    }

    const values = [];
    const markers = [];

    for (let row of dataValues) {
      const rowMarkers = [];

      for (let v of row) {
        if (typeof(v) === 'string' && /\([^\)]*\)/.test(v)) {
          rowMarkers.push(v);
        } else {
          values.push(v);
          rowMarkers.push(`$${values.length}`);
        }
      }

      markers.push(`(${rowMarkers.join(',')})`);
    }

    return {
      isMulti,
      sql: `INSERT INTO "${model.tableName}" (${columns}) VALUES ${markers.join(',')} RETURNING *`,
      values
    };
  }

  static read(model, clauses = {}, fields = []) {
    if (fields.length === 0) {
      fields = ['*'];
    }

    const where = this.whereClause(clauses);

    let sql = `SELECT ${fields.join(',')} FROM ${model.tableName}`;
    if (where.sql) { sql += ` ${where.sql}`; }

    return { sql, values: where.values };
  }

  static debug(operation, { sql, values }) {
    const arr = [
      bold(`===== ${operation} =====`),
      magenta('SQL'),
      stripLeadingSpace(sql)
    ];

    if (values != null) {
      arr.push(magenta('VALUES'), JSON.stringify(values));
    }

    return arr.join('\n');
  }
}

export default Statement;
