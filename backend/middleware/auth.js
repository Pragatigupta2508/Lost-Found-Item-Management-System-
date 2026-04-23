const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err); // 👈 add this
    res.status(400).send("Invalid token");
  }
};