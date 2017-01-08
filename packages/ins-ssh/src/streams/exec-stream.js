import { Duplex } from 'stream';
import { spawn } from 'child_process';

class ExecStream extends Duplex {
  constructor(command) {
    super();
    this.command = command;
  }

  get proc() {
    if (!this.proc) {
      this.proc = spawn('/bin/sh', ['-c', this.command], { stdio: ['pipe', 'pipe', 'ignore'] });
      this.proc.stdout.on('data', (data) => this.push(data));
      this.proc.on('close', (code) => this.push(null));
    }
    return this.proc;
  }

  _write(chunk, encoding, callback) {
    this.proc.stdin.write(chunk, encoding, callback);
  }

  _read(size) {
    // just trigger proc creation
    this.proc;
  }
}

export default ExecStream;
