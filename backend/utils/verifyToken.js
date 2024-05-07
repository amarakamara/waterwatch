import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  jwt.verify(token.split(" ")[1], jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    next();
  });
}

export default verifyToken;
