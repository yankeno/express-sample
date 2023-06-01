import express from "express";
import { create } from "@/controllers/spendingController";

const router = express.Router();

router.post("/create", create);

export default router;
