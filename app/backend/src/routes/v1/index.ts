import { Router } from "express";
import { authMiddleware } from "~/middleware/authMiddleware";
import example from "./example";
import users from "./users";
import aggregate from "./aggregate";
import category from "./category";
import spending from "./spending";
import budget from "./budget";
import auth from "./auth";

const router = Router();
const routes = ["/aggregate", "/users", "/category", "/spending", "budget"];
router.use(routes, authMiddleware);

router.use("/example", example);
router.use("/aggregate", aggregate);
router.use("/users", users);
router.use("/category", category);
router.use("/spending", spending);
router.use("/budget", budget);
router.use("/auth", auth);

export default router;
