import express from "express";
import { index, upsert } from "~/controllers/budgetController";

const router = express.Router();

router.get("/", index);
router.post("/upsert", upsert);

export default router;
