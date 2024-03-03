const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // this token is for temporary testing purpose
  // token =
  //   "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTJjMmE4NGE2Yzc5MTM4YTgwNmM2NSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5MzY4ODIwfQ.0ihZGM8SFTY3JFb4BNDIjG8sumNzS-_Ean0MycfICmg; Path=/; Expires=Sat, 02 Mar 2024 09:40:20 GMT; HttpOnly";
  return token;
};
