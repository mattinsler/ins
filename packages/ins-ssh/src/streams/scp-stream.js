import nopt from 'nopt';
import { PassThrough, Transform } from 'stream';

const TEXT = 'TEXT';
const STREAM = 'STREAM';

function parse(message) {
  if (message[0] === 'C') {
    const match = /^C([0-9]{4}) ([0-9]+) (.+)$/.exec(message.trim());
    return {
      type: 'COPY',
      mode: parseInt(match[1], 8),
      size: parseInt(match[2]),
      filename: match[3]
    };
  } else if (message[0] === 'D') {
    throw new Error('Error: Directory transfers are not supported');
  }
}

class ScpStream extends Transform {
  static isSCP(command) {
    return /^scp /.test(command);
  }

  constructor(command) {
    super();

    const match = /-t +(.+)$/.exec(command);
    if (!match) { throw new Error('Command is not an incoming SCP request'); }

    this.target = match[1].trim();
    // console.log('new scp to file', this.target);

    this.current = null;
    this.output = [];

    this.stage = TEXT;
    this.ok();
  }

  ok() {
    // console.log('ok');
    this.push(new Buffer([0]));
  }

  fatal(message) {
    // console.log('fatal', message);
    this.push(Buffer.concat([new Buffer([0]), new Buffer(message), new Buffer([10])]));
    this.push(null);
  }

  _transform(chunk, encoding, callback) {
    // console.log('_transform', chunk, encoding);

    if (this.stage === TEXT) {
      try {
        const message = parse(chunk.toString());
        // console.log(message);
        if (message.type === 'COPY') {
          this.current = {
            filename: this.target,
            mode: message.mode,
            size: message.size,
            bytesWritten: 0,
            stream: new PassThrough()
          };
          this.emit('file', this.current);

          this.stage = STREAM;
          this.ok();
          callback();
        }
      } catch (err) {
        this.fatal(err.message);
      }
    } else if (this.stage === STREAM) {
      // console.log('stream data', chunk);

      const length = Buffer.byteLength(chunk);
      const bytesToRead = Math.min(length, this.current.size - this.current.bytesWritten);

      this.current.stream.write(chunk.slice(0, bytesToRead));
      this.current.bytesWritten += bytesToRead;

      if (this.current.bytesWritten === this.current.size) {
        this.current.stream.end();
        this.stage = TEXT;
      }

      this.ok();
      callback();
    }
  }

  _flush(callback) {
    // console.log('_flush');
    callback();
  }
}

export default ScpStream;
