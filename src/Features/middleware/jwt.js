import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send("No token, authorization denied");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.user;
    // console.log(req.user);
  } catch (error) {
    return res.status(401).send("Token is not valid");
  }
  next();
};

export default jwtAuth;
