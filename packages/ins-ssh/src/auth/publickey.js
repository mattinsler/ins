import fs from 'fs';
import crypto from 'crypto';
import { utils } from 'ssh2';
import buffersEqual from 'buffer-equal-constant-time';

class PublicKeyAuthentication {
  method = 'publickey';

  constructor(authorizedKeyFile) {
    this.publicKey = utils.genPublicKey(utils.parseKey(fs.readFileSync(authorizedKeyFile)));
    console.log(this.publicKey);
  }

  authenticate({ blob, key, sigAlgo, signature }) {
    console.log('PUBLICKEY');
    console.log(key.data.toString());
    if (key.algo === this.publicKey.fulltype && buffersEqual(key.data, this.publicKey.public)) {
      if (!signature) { return true; }

      const verifier = crypto.createVerify(sigAlgo);
      verifier.update(blob);

      return verifier.verify(this.publicKey.publicOrig, signature);
    }

    return false;
  }
}

export default PublicKeyAuthentication;
