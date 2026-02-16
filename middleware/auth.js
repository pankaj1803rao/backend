const jwt = require("jsonwebtoken");
const User = require("../models/userSchem");
const Session = require("../models/seesion");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    let decoded;
    try {
      decoded = await Session.findById(token);
      // decoded = jwt.verify(token, "abc1212334fsf");
    } catch (err) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or expired token" });
    }

    const user = await User.findOne({ _id: decoded.userId }).lean();

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = auth;
