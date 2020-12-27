export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Cannot GET - ${req.originalUrl}` });
  next();
};
