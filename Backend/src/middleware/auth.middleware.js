const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = {
      userId: decoded.userId || decoded.id || decoded._id,
      role: decoded.role,
      tenantId: decoded.tenantId || null,
    };

    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
