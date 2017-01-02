class Session {
  constructor(server, client, session) {
    this.server = server;
    this.client = client;
    this.session = session;

    // console.log({
    //   remoteAddress: client._sock.remoteAddress,
    //   remotePort: client._sock.remotePort
    // });
  }

  start() {
    let rows, cols, term;
    const env = {};

    this.session.on('pty', (accept, reject, info) => {
      rows = info.rows;
      cols = info.cols;
      term = info.term;
      accept();
    });

    this.session.on('env', (accept, reject, info) => {
      Object.assign(env, info);
    });

    this.session.on('shell', (accept, reject) => {
      if (!this.server.onShell) { return reject(); }
      this.server.onShell({
        client: this.client,
        session: this.session,
        accept,
        reject
      });
    });

    this.session.on('exec', (accept, reject, { command }) => {
      if (!this.server.onExec) { return reject(); }
      this.server.onExec({
        client: this.client,
        session: this.session,
        accept,
        reject,
        command
      });
    });
  }

  // onSession = (accept, reject) => {
  //   const session = accept();
  //
  //   let rows, cols, term;
  //   const env = {};
  //
  //   session.on('pty', (accept, reject, info) => {
  //     console.log('pty');
  //     // console.log(info);
  //     rows = info.rows;
  //     cols = info.cols;
  //     term = info.term;
  //     accept();
  //   });
  //
  //   session.on('env', (accept, reject, info) => {
  //     console.log('env');
  //     Object.assign(env, info);
  //   });
  //
  //   session.on('shell', (accept, reject) => {
  //     console.log('shell');
  //
  //     container.attach({
  //       stream: true,
  //       stdout: true,
  //       stdin: true,
  //       tty: true
  //     }, (err, containerStream) => {
  //       if (err) { return reject(err); }
  //
  //       const stream = accept();
  //
  //       stream.pipe(containerStream).pipe(stream);
  //
  //       stream.once('close', () => {
  //         console.log('STREAM closed');
  //       });
  //     });
  //
  //     // stream.on('data', (data) => {
  //     //   console.log('STREAM', data);
  //     //   stream.write(data);
  //     // });
  //   });
  //
  //
  //   [
  //     'window-change', 'x11', 'signal',
  //     'auth-agent', 'exec', 'sftp', 'subsystem', 'close'
  //   ].forEach(e => {
  //     session.on(e, (...args) => console.log(e, args));
  //   });
  //
  //   //     client.on('session', function(accept, reject) {
  //   //       const session = accept();
  //   //
  //   //
  //   //       var session = accept();
  //   //       session.once('exec', function(accept, reject, info) {
  //   //         console.log('Client wants to execute: ' + inspect(info.command));
  //   //         var stream = accept();
  //   //         stream.stderr.write('Oh no, the dreaded errors!\n');
  //   //         stream.write('Just kidding about the errors!\n');
  //   //         stream.exit(0);
  //   //         stream.end();
  //   //       });
  //   //     });
  //
  // }
}

export default Session;
