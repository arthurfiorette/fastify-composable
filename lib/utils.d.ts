/**
 * Simple utility to throw error types without allowing using the error text
 * string as valid type.
 */
// https://x.com/ssalbdivad/status/1912372299707089329
export type ErrorMessage<msg extends string> = `${msg}${'' & {}}`;

export type MissingDependencyError = ErrorMessage<'Plugin requires a dependency that is not present in this context.'>;

// from fastify/types/instance.d.ts
export type GetterSetter<This, T> =
  | T
  | {
      getter: (this: This) => T;
      setter?: (this: This, value: T) => void;
    };
