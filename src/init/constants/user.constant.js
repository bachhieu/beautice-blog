const userRoleEnum = {
  ADMIN: "ADMIN",
  MANAGER: "manager",
  WRITER: "writer",
  VIEWER: "viewer",
};

const userRoleArray = Object.values(userRoleEnum);
module.exports = {
  userRoleEnum,
  userRoleArray,
};
