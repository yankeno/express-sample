import express from "express";
import { login, register, user } from "~/controllers/authController";
import { check } from "express-validator";

const router = express.Router();

router.post("/login", login);
router.post(
  "/register",
  [
    check("email").isEmail(),
    check("name").isLength({ min: 1 }),
    check("password").isLength({ min: 8 }),
  ],
  register
);
router.get("/user", user);

export default router;
