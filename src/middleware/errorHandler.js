export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status ?? 500;
  const message = status === 500 ? "Error interno del servidor" : err.message;
  res.status(status).json({ error: message });
}
