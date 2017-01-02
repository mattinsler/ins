import betturl from 'betturl';

import Pool from './pool';

function connectPool(parsed) {
  return new Promise((resolve, reject) => {
    const opts = {
      host: parsed.host,
      port: parsed.port,
      max: 10
    };

    if (parsed.auth) {
      if (parsed.auth.user) { opts.user = parsed.auth.user; }
      if (parsed.auth.password) { opts.password = parsed.auth.password; }
    }

    if (parsed.path) {
      const path = parsed.path.replace(/^\/+/, '');
      if (path) {
        opts.database = path;
      }
    }

    const pool = new Pool(opts);

    pool.on('connected', () => resolve(pool));
    pool.on('error', reject);

    pool.connect();
  });
}

const Cockroach = {
  connections: [],

  connect(url) {
    const parsed = betturl.parse(url);
    // normalize? use names?
    if (!this.connections[url]) {
      this.connections[url] = connectPool(parsed);
    }

    return this.connections[url];
  }
};

export default Cockroach;
