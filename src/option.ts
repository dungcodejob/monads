export interface Option<T> {
  bind<R>(transform: (_: T) => Option<R>): Option<R>;
  map<R>(func: (value: T) => R): Option<R>;
  get(): T;
}

class Just<T> implements Option<T> {
  private readonly val: T;

  constructor(val: T) {
    this.val = val;
  }
  map<R>(func: (value: T) => R): Option<R> {
    if (this.val === null || this.val === undefined) {
      return Monads.nothing();
    }

    return Monads.just(func(this.val));
  }

  bind<R>(transform: (_: T) => Option<R>): Option<R> {
    return transform(this.val);
  }
  get(): T {
    return this.val;
  }
}

class Nothing<T> implements Option<T> {
  map<R>(): Option<R> {
    return new Nothing<R>();
  }
  bind<R>(): Option<R> {
    return new Nothing<R>();
  }

  get(): never {
    throw Error();
  }
}

export class Monads {
  static just<T>(val: T): Just<T> {
    return new Just(val);
  }

  static nothing<T>(): Nothing<T> {
    return new Nothing();
  }
}
