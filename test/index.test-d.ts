import fastify from 'fastify';
import type { FastifyComposableInstance } from '../lib/instance';

const app = fastify().composable();

app.register(async (app: FastifyComposableInstance) => {});
