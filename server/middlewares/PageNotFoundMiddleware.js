module.exports = (req, res) => {
  res.status(404).json({
    success: false,
    message: "page not found",
  });
};
