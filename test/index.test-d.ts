import fastify from 'fastify';
import type { FastifyComposableInstance } from '../lib/instance';

const app: FastifyComposableInstance = fastify().composable();

app.register(async (app: FastifyComposableInstance) => {
  app.decorate('foo', 'bar');
  app.decorateReply('rep', 'bar');
  app.decorateRequest('req', 'bar');
});
