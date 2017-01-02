import fs from 'fs';

class PasswordAuthentication {
  method = 'password';

  constructor(opts) {
    if (typeof(opts) === 'string') {
      this.users = this.readUserFile(opts);
      this.authenticate = ({ username, password }) => {
        return this.users[username] && this.users[username] === password;
      }
    } else if (typeof(opts) === 'function') {
      this.authenticate = ({ username, password }, client) => {
        return opts({ username, password }, client);
      }
    }
  }

  readUserFile(filename) {
    const content = fs.readFileSync(filename).toString();
    return JSON.parse(content);
  }
}

export default PasswordAuthentication;
