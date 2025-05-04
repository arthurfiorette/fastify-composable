/**
 * The base type for all extensions.
 */
export interface FastifyExtensions {
  /**
   * Extensions that will be applied to {@linkcode FastifyInstance}.
   */
  instance?: Record<never, never>;

  /**
   * Extensions that will be applied to {@linkcode FastifyRequest}.
   */
  request?: Record<string, never>;

  /**
   * Extensions that will be applied to {@linkcode FastifyReply}.
   */
  reply?: Record<never, never>;

  /**
   * If this is a plugin, this will be the list of dependencies that this plugin needs to be registered.
   */
  dependencies?: FastifyExtensions;
}
