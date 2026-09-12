declare module 'lodash.constant' {
  function constant<T>(value: T): () => T;
  export = constant;
}
