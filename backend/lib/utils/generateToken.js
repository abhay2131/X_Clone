// import jwt from "jsonwebtoken";
// // import { ObjectId } from "mongodb";

// export const generateTokenAndSetCookie = (userId, res) => {
//   // const payload = { userId: userId.toString() };
//   // console.log(payload);
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "15d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 15 * 24 * 60 * 60 * 1000, // minisecond
//     httpOnly: true, // prevent XSS attacks cross-site scripitng attacks
//     sameSite: "strict", // CSRF attacks cross-site requrest forgery attacks
//     secure: process.env.NODE_ENV !== "development",
//   });
// };

import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};
