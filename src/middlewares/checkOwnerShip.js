function checkOwnership(req, res, next) {
  const { id } = req.params;
  if (req.user._id.toString() !== id) {
    return res.status(403).json({
      success: false,
      error: "Unauthorized action",
    });
  }
  next();
}

module.exports = checkOwnership;
