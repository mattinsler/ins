import fs from 'fs';
import ssh2 from 'ssh2';
import Session from './session';

class Server {
  // listens for connections
  // spits out sockets
  constructor() {
    this.serverOptions = {
      hostKeys: []
    };
    this.authModules = [];
  }

  addKey(key) {
    if (typeof(key) === 'string') {
      const keyBuffer = fs.readFileSync(key);
      this.serverOptions.hostKeys.push(keyBuffer);
    } else if (Buffer.isBufer(key)) {
      this.serverOptions.hostKeys.push(key);
    }

    return this;
  }

  useAuthentication(authModule) {
    this.authModules.push(authModule);

    return this;
  }

  listen(port, address = '0.0.0.0') {
    this.server = new ssh2.Server(
      this.serverOptions,
      (client) => this.onClient(client)
    );

    return new Promise((resolve, reject) => {
      this.server.listen(port, address, () => {
        resolve(this.server.address());
      });
    });
  }

  onClient(client) {
    client.on('authentication', async (ctx) => {
      let handled = false;
      const { method } = ctx;

      const auth = this.authModules.find(a => a.method === method);

      if (!auth) { return ctx.reject(); }

      if (await auth.authenticate(ctx, client)) {
        ctx.accept();
      } else {
        ctx.reject();
      }
    });

    client.on('ready', () => {
      client.on('session', (accept, reject) => {
        const session = new Session(this, client, accept());
        session.start();
      });
    });

    client.on('end', function() {
      console.log('Client disconnected');
    });
  }
}

export default Server;
