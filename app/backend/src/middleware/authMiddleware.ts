import { jwt_secret_key } from "~/orm/config/auth";

const { expressjwt: jwt } = require("express-jwt");
export const authMiddleware = jwt({
  secret: jwt_secret_key,
  algorithms: ["HS256"],
});
