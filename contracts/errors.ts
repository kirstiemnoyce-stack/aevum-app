// Lightweight error helpers shared across the API.

function makeError(status: number, message: string) {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  return err;
}

export const Errors = {
  badRequest: (msg = "Bad request") => makeError(400, msg),
  unauthorized: (msg = "Unauthorized") => makeError(401, msg),
  forbidden: (msg = "Forbidden") => makeError(403, msg),
  notFound: (msg = "Not found") => makeError(404, msg),
};
