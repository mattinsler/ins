import cockroach from 'ins-cockroach';
import createConnections from '@mattinsler/app-context-create-connections';

const initializer = createConnections('cockroach', (url, opts) => {
  return cockroach.connect(url);
});

export default initializer;
