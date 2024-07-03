import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
      console.log("Token verification problem");
    }

    req.user = decoded;
    next();
  });
}

export default verifyToken;
