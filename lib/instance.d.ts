import type {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault
} from 'fastify';
import type { FastifyExtensions } from './extensions';
import type { FastifyComposablePluginAsync, FastifyComposablePluginCallback } from './plugin';
import type { FastifyComposableRegisterOptions } from './register';
import type { MissingDependencyError } from './utils';

declare module 'fastify' {
  interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    Logger extends FastifyBaseLogger = FastifyBaseLogger,
    TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault
  > {
    /**
     * Returns the same fastify instance but with new types.
     */
    composable(
      this: void
    ): FastifyComposableInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider, Record<never, never>>;
  }
}

/**
 * Similar to a `FastifyInstance` but its type can be composed with other plugins.
 */
export type FastifyComposableInstance<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Extensions extends FastifyExtensions = Record<never, never>
> = IFastifyComposableInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider, Extensions> &
  Extensions['instance'];

// Since interface cannot extend type, this "base" private interface must be used
interface IFastifyComposableInstance<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider,
  Extensions extends FastifyExtensions
> extends Omit<FastifyInstance, 'register'> {
  // Changed from T generic because asserts cannot assert generic parameter
  //
  // Just like FastifyRegister but with asserts as return type and the dependency check
  register<Options extends FastifyPluginOptions, PluginExtensions extends FastifyExtensions>(
    plugin: Extensions extends PluginExtensions['dependencies']
      ?
          | FastifyComposablePluginCallback<
              FastifyPluginOptions,
              RawServer,
              RawRequest,
              RawReply,
              Logger,
              TypeProvider,
              PluginExtensions
            >
          | FastifyComposablePluginAsync<
              FastifyPluginOptions,
              RawServer,
              RawRequest,
              RawReply,
              Logger,
              TypeProvider,
              PluginExtensions
            >
      : MissingDependencyError,
    opts?: FastifyComposableRegisterOptions<Options, PluginExtensions>
  ): asserts this is FastifyComposableInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider,
    PluginExtensions & Extensions
  >;
}
