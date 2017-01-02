import fs from 'fs';
import path from 'path';

function connect(context, fn) {
  const Model = require(path.join(context.root, 'node_modules', 'ins-model')).Model;
  Model.connection = fn(context);
}

function readModels(context, modelsDir) {
  const models = {};
  const root = path.join(context.root, modelsDir);

  for (let filename of fs.readdirSync(root)) {
    const wrapper = require(path.join(root, filename));
    Object.assign(models, wrapper);
  }

  context.model = models;
}

function initializer(...args) {
  return function(context) {
    if (args[0] === 'connect') {
      return connect(context, args[1]);
    } else {
      return readModels(context, args[0]);
    }
  };
}

export default initializer;
