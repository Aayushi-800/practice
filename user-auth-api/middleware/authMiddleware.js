import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token is required." });
  }

  const token = authorization.slice("Bearer ".length).trim();

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.sub) {
      return res.status(401).json({ message: "Invalid authentication token." });
    }
    req.user = { id: payload.sub };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired authentication token." });
  }
}