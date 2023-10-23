declare namespace Express {
  export interface Request {
    user: object;
  }
  export interface Response {
    user: object;
  }
}

declare module globalThis {
  var conn: Promise;
  var promise: Promise;
}
