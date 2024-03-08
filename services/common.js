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

  // User Token
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTQ0YWM0YjIxN2E2NTQ3Y2EzYTNjYyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5NDcwMjM3fQ.6budRYRoKNTnNclrvOnjwdiWQrrlWpcFhK1uCmfiBKA";

  // Admin Token
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTQ0OWM1YjIxN2E2NTQ3Y2EzYTM5YiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTQ3MDg4MH0.-kYq_QTkpzogrCuKEJDOr0FdQS5wy-ob24YnxXFY1v8";

  return token;
};
