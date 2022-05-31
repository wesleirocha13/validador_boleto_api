module.exports = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Resource ${req.method}${req.originalUrl} not found.`,
  });
};
