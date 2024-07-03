import jwt from "jsonwebtoken"
const JWTsecret = process.env.JWT_SECRET;

const generateRandomToken = (user, expiry) => {
  return jwt.sign({ user }, JWTsecret, { expiresIn: expiry });
};

export default generateRandomToken;
