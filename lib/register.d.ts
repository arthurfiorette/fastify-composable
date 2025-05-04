import type {
  FastifyBaseLogger,
  FastifyTypeProvider,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RegisterOptions
} from 'fastify';
import type { FastifyExtensions } from './extensions';
import type { FastifyComposableInstance } from './instance';

export type FastifyComposableRegisterOptions<Options, Extensions extends FastifyExtensions> =
  | (RegisterOptions & Options)
  | ((
      instance: FastifyComposableInstance<
        RawServerBase,
        RawRequestDefaultExpression<RawServerBase>,
        RawReplyDefaultExpression<RawServerBase>,
        FastifyBaseLogger,
        FastifyTypeProvider,
        Extensions
      >
    ) => RegisterOptions & Options);
