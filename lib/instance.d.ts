import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyInstance,
  FastifyPluginOptions,
  FastifySchema,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface
} from 'fastify';
import type { FastifyExtensions } from './extensions';
import type { FastifyComposablePluginAsync, FastifyComposablePluginCallback } from './plugin';
import type { FastifyComposableRegisterOptions } from './register';
import type { FastifyComposableReply } from './reply';
import type { FastifyComposableRequest } from './request';
import type { GetterSetter, MissingDependencyError } from './utils';

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
> extends Omit<FastifyInstance, 'register' | 'decorate' | 'decorateRequest' | 'decorateReply'> {
  /**
   * Register a plugin with the instance.
   */
  register<PluginExtensions extends FastifyExtensions>(
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
          | Promise<{
              default: FastifyComposablePluginCallback<
                FastifyPluginOptions,
                RawServer,
                RawRequest,
                RawReply,
                Logger,
                TypeProvider,
                PluginExtensions
              >;
            }>
          | Promise<{
              default: FastifyComposablePluginAsync<
                FastifyPluginOptions,
                RawServer,
                RawRequest,
                RawReply,
                Logger,
                TypeProvider,
                PluginExtensions
              >;
            }>
      : MissingDependencyError
  ): asserts this is FastifyComposableInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider,
    PluginExtensions & Extensions
  >;
  register<Options extends FastifyPluginOptions, PluginExtensions extends FastifyExtensions>(
    plugin: Extensions extends PluginExtensions['dependencies']
      ?
          | FastifyComposablePluginCallback<
              Options,
              RawServer,
              RawRequest,
              RawReply,
              Logger,
              TypeProvider,
              PluginExtensions
            >
          | FastifyComposablePluginAsync<
              Options,
              RawServer,
              RawRequest,
              RawReply,
              Logger,
              TypeProvider,
              PluginExtensions
            >
          | Promise<{
              default: FastifyComposablePluginCallback<
                Options,
                RawServer,
                RawRequest,
                RawReply,
                Logger,
                TypeProvider,
                PluginExtensions
              >;
            }>
          | Promise<{
              default: FastifyComposablePluginAsync<
                FastifyPluginOptions,
                RawServer,
                RawRequest,
                RawReply,
                Logger,
                TypeProvider,
                PluginExtensions
              >;
            }>
      : MissingDependencyError,
    opts: FastifyComposableRegisterOptions<Options, PluginExtensions>
  ): asserts this is FastifyComposableInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider,
    PluginExtensions & Extensions
  >;

  decorate<P extends string, V>(
    property: P,
    value: GetterSetter<
      this,
      V extends (...args: any[]) => any ? (this: this, ...args: Parameters<V>) => ReturnType<V> : V
    >,
    dependencies?: (keyof this)[]
  ): asserts this is FastifyComposableInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider,
    Extensions & { instance: Record<P, V> }
  >;

  decorateRequest<
    P extends string,
    V,
    R = FastifyComposableRequest<
      RouteGenericInterface,
      RawServer,
      RawRequest,
      FastifySchema,
      TypeProvider,
      ContextConfigDefault,
      Logger,
      Extensions
    >
  >(
    property: P,
    value: GetterSetter<R, V extends (...args: any[]) => any ? (this: R, ...args: Parameters<V>) => ReturnType<V> : V>,
    dependencies?: (keyof this)[]
  ): asserts this is FastifyComposableInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider,
    Extensions & { request: Record<P, V> }
  >;

  decorateReply<
    P extends string,
    V,
    R = FastifyComposableReply<
      RouteGenericInterface,
      RawServer,
      RawRequest,
      RawReply,
      ContextConfigDefault,
      FastifySchema,
      TypeProvider,
      Extensions
    >
  >(
    property: P,
    value: GetterSetter<R, V extends (...args: any[]) => any ? (this: R, ...args: Parameters<V>) => ReturnType<V> : V>,
    dependencies?: (keyof this)[]
  ): asserts this is FastifyComposableInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider,
    Extensions & { reply: Record<P, V> }
  >;
}
