const { parseToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
  
  const token = req.headers["x-authorization"];
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(` `);
    if (bearer.length > 1 && bearer[1].includes("null") === false) {
      try {
        const bearerToken = bearer[1];
        const payload = parseToken(bearerToken);
        req.user = payload;
        req.token = bearerToken;
      } catch (err) {
        return res.status(401).json({ message: "Invalid authorization token" });
      }
    }
  }

  if (token) {
    try {
      const payload = parseToken(token);
      req.user = payload;
      req.token = token;
      // sessionStorage.setItem("token", token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }
  }

  next();
};
