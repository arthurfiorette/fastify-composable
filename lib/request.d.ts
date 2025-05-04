import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface
} from 'fastify';
import type { FastifyRequestType, ResolveFastifyRequestType } from 'fastify/types/type-provider';
import type { FastifyExtensions } from './extensions';
import type { FastifyComposableInstance } from './instance';

export type FastifyComposableRequest<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  ContextConfig = ContextConfigDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  Extensions extends FastifyExtensions = Record<never, never>,
  RequestType extends FastifyRequestType = ResolveFastifyRequestType<TypeProvider, SchemaCompiler, RouteGeneric>
> = IFastifyComposableRequest<
  RouteGeneric,
  RawServer,
  RawRequest,
  SchemaCompiler,
  TypeProvider,
  ContextConfig,
  Logger,
  Extensions,
  RequestType
> &
  Extensions['request'];

interface IFastifyComposableRequest<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  ContextConfig = ContextConfigDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  Extensions extends FastifyExtensions = Record<never, never>,
  RequestType extends FastifyRequestType = ResolveFastifyRequestType<TypeProvider, SchemaCompiler, RouteGeneric>
> extends Omit<
    FastifyRequest<
      RouteGeneric,
      RawServer,
      RawRequest,
      SchemaCompiler,
      TypeProvider,
      ContextConfig,
      Logger,
      RequestType
    >,
    'server'
  > {
  server: FastifyComposableInstance<
    RawServer,
    RawRequest,
    RawReplyDefaultExpression<RawServer>,
    Logger,
    TypeProvider,
    Extensions
  >;
}
