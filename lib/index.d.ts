import type { FastifyPluginCallback } from 'fastify';

/**
 * At runtime, this basically is a no-op, but it allows us to use the
 * returned instance with new types.
 */
export declare const composablePlugin: FastifyPluginCallback;

export type { FastifyExtensions } from './extensions';
export type { FastifyComposableInstance } from './instance';
export type {
  FastifyComposablePluginAsync,
  FastifyComposablePluginCallback
} from './plugin';
export { FastifyComposableReply } from './reply';
export { FastifyComposableRequest } from './request';
