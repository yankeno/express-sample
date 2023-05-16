import express from "express";
import { amount, category } from "../../controllers/aggregateController";

const router = express.Router();

router.get("/category", category);
router.get("/amount", amount);

export default router;
