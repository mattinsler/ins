import Password from './auth/password';
import PublicKey from './auth/publickey';

export Server from './server';
export { createKeypair } from './utils';

export const auth = {
  Password,
  PublicKey
};
