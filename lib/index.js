const fp = require('fastify-plugin');

const composablePlugin = fp(
  function composablePlugin(fastify, _, next) {
    fastify.decorate('composable', function composable() {
      return this;
    });
    return next();
  },
  {
    name: 'fastify-composable',
    fastify: '5.x'
  }
);

module.exports.composablePlugin = composablePlugin;
module.exports.default = composablePlugin;
module.exports.fp = fp;
