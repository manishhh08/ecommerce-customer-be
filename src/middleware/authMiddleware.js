import { findByFilter } from "../models/customers/customerModel.js";
// import { decodeAccessToken, decodeRefreshToken } from "../utils/jwt.js";
import { decodeAccessToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    let decoded = decodeAccessToken(accessToken);
    console.log("Return value", decoded);
    let user = await findByFilter({ email: decoded.email });
    console.log(user);

    // if (user && user?.accessToken.includes(accessToken)) {
    if (user) {
      user.password = "";
      req.user = user;
      next();
    } else {
      res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } catch (err) {
    console.log("Auth error:", err);
    let errorMessage = err.message.includes("jwt expire")
      ? err.message
      : "Server Error";

    let statusCode = err.message.includes("jwt expire") ? 401 : 500;
    return res
      .status(statusCode)
      .json({ message: errorMessage, status: "error" });
  }
};

// export const refreshMiddleware = async (req, res, next) => {
//   try {
//     const refreshToken = req.headers.authorization;
//     let decoded = decodeRefreshToken(refreshToken);

//     let user = await getUser({ email: decoded.email });

//     // console.log(user, refreshToken);

//     if (user && user.refreshToken == refreshToken) {
//       user.password = "";
//       req.user = user;
//       next();
//     } else {
//       res.status(401).json({ message: "Unauthorised" });
//     }
//   } catch (err) {
//     console.log(err.message);
//     let errorMessage = err.message.includes("jwt expire")
//       ? err.message
//       : "Server Error";

//     let statusCode = err.message.includes("jwt expire") ? 401 : 500;
//     return res
//       .status(statusCode)
//       .json({ message: errorMessage, status: "error" });
//   }
// };

// export const isAdmin = async (req, res, next) => {
//   if (req.user.role == "admin") {
//     next();
//   } else {
//     return res.json({
//       status: "error",
//       message: "User not authorized!",
//     });
//   }
// };
