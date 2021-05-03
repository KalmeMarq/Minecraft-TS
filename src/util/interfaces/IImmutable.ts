type IImmutable<T> = {
  readonly [K in keyof T]: IImmutable<T[K]>;
}

export default IImmutable

