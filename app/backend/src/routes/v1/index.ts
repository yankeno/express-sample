import { Router } from "express";

import example from "./example";
import users from "./users";
import aggregate from "./aggregate";
import category from "./category";
import spending from "./spending";
import budget from "./budget";

const router = Router();

router.use("/example", example);
router.use("/aggregate", aggregate);
router.use("/users", users);
router.use("/category", category);
router.use("/spending", spending);
router.use("/budget", budget);

export default router;
