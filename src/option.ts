export interface Option<T> {
  bind<R>(transform: (_: T) => Option<R>): Option<R>;
  map<R>(func: (value: T) => R): Option<R>;
  do(func: (value: T) => void): Option<T>;
  match<R1, R2>(
    ifJust: (value: T) => R1,
    ifNothing: () => R2
  ): Option<R1> | Option<R2>;
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

  do(func: (value: T) => void): Option<T> {
    func(this.val);
    return Monads.just(this.val);
  }

  match<R1>(ifJust: (value: T) => R1): Option<R1> {
    return Monads.just(ifJust(this.val));
  }

  bind<R>(transform: (_: T) => Option<R>): Option<R> {
    return transform(this.val);
  }
  get(): T {
    return this.val;
  }
}

class Nothing<T> implements Option<T> {
  do(): Option<T> {
    return new Nothing<T>();
  }
  match<R1, R2>(_: (value: T) => R1, ifNothing: () => R2): Option<R2> {
    return Monads.just(ifNothing());
  }
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
