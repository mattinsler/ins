import Password from './auth/password';
import PublicKey from './auth/publickey';

import Exec from './streams/exec-stream';
import SCP from './streams/scp-stream';

export Server from './server';
export { createKeypair } from './utils';

export const auth = {
  Password,
  PublicKey
};

export const streams = {
  Exec,
  SCP
};
