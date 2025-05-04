import fp from 'fastify-plugin';

/**
 * At runtime, this basically is a no-op, but it allows us to use the
 * returned instance with new types.
 */
export const composablePlugin = fp((fastify, _, next) => {
  fastify.decorate('composable', () => fastify);
  return next();
});
