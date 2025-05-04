import type {
  FastifyBaseLogger,
  FastifyPluginOptions,
  FastifyTypeProvider,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase
} from 'fastify';
import type { FastifyExtensions } from './extensions';
import type { FastifyComposableInstance } from './instance';

/**
 * FastifyPluginCallback
 *
 * Fastify allows the user to extend its functionalities with plugins. A plugin can be a set of routes, a server decorator or whatever. To activate plugins, use the `fastify.register()` method.
 */
export type FastifyComposablePluginCallback<
  Options extends FastifyPluginOptions,
  RawServer extends RawServerBase = RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProvider,
  Extensions extends FastifyExtensions = FastifyExtensions
> = (
  instance: FastifyComposableInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider, Extensions>,
  opts: Options,
  done: (err?: Error) => void
) => void;

/**
 * FastifyPluginAsync
 *
 * Fastify allows the user to extend its functionalities with plugins. A plugin can be a set of routes, a server decorator or whatever. To activate plugins, use the `fastify.register()` method.
 */
export type FastifyComposablePluginAsync<
  Options extends FastifyPluginOptions,
  RawServer extends RawServerBase = RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProvider,
  Extensions extends FastifyExtensions = FastifyExtensions
> = (
  instance: FastifyComposableInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider, Extensions>,
  opts: Options
) => Promise<void>;
