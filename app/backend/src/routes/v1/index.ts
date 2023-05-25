import { Router } from "express";

import example from "./example";
import users from "./users";
import aggregate from "./aggregate";
import category from "./category";

const router = Router();

router.use("/example", example);
router.use("/aggregate", aggregate);
router.use("/users", users);
router.use("/category", category);

export default router;
