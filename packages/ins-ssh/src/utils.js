import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export function createKeypair(dir, keyname) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const keyfile = path.join(dir, keyname);
  if (!fs.existsSync(keyfile)) {
    execSync(`echo '${keyname}\n\n\n' | ssh-keygen -q -t rsa -b 4096 -N '' > /dev/null`, { cwd: dir });
  }
}
