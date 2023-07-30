import express from "express";
import { login, logout, register } from "~/controllers/authController";
import { check } from "express-validator";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post(
  "/register",
  [
    check("email").isEmail(),
    check("name").isLength({ min: 1 }),
    check("password").isLength({ min: 8 }),
  ],
  register
);

export default router;
