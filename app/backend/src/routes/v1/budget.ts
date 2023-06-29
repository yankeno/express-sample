import express from "express";
import { index } from "~/controllers/budgetController";

const router = express.Router();

router.get("/", index);

export default router;
