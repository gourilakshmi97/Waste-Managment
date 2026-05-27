import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    // CHECK HEADER
    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      console.log("DEBUG: Auth header missing or malformed");

      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    // EXTRACT TOKEN
    const token = authHeader.split(" ")[1];

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    );

    console.log(
      "DECODED PAYLOAD STRUCTURE:",
      JSON.stringify(decoded, null, 2)
    );

    // STORE USER DATA
    req.user = decoded;

    next();

  } catch (error) {

    console.error(
      "DEBUG: JWT Verification Failed:",
      error.message
    );

    return res.status(401).json({
      message: "Token is not valid",
    });
  }
};

export default authMiddleware;