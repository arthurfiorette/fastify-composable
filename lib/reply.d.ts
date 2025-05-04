import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyReply,
  FastifySchema,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface
} from 'fastify';
import type { FastifyReplyType, ResolveFastifyReplyType } from 'fastify/types/type-provider';
import type { FastifyExtensions } from './extensions';
import type { FastifyComposableInstance } from './instance';
import type { FastifyComposableRequest } from './request';

export type FastifyComposableReply<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Extensions extends FastifyExtensions = Record<never, never>,
  ReplyType extends FastifyReplyType = ResolveFastifyReplyType<TypeProvider, SchemaCompiler, RouteGeneric>
> = IFastifyComposableReply<
  RouteGeneric,
  RawServer,
  RawRequest,
  RawReply,
  ContextConfig,
  SchemaCompiler,
  TypeProvider,
  Extensions,
  ReplyType
> &
  Extensions['reply'];

interface IFastifyComposableReply<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Extensions extends FastifyExtensions = Record<never, never>,
  ReplyType extends FastifyReplyType = ResolveFastifyReplyType<TypeProvider, SchemaCompiler, RouteGeneric>
> extends Omit<
    FastifyReply<RouteGeneric, RawServer, RawRequest, RawReply, ContextConfig, SchemaCompiler, TypeProvider, ReplyType>,
    'request' | 'server'
  > {
  server: FastifyComposableInstance<RawServer, RawRequest, RawReply, FastifyBaseLogger, TypeProvider, Extensions>;

  request: FastifyComposableRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    TypeProvider,
    ContextConfig,
    FastifyBaseLogger,
    Extensions
  >;
}
