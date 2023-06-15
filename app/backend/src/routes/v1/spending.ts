import express from "express";
import { create, list } from "@/controllers/spendingController";

const router = express.Router();

router.post("/create", create);
router.get("/list", list);

export default router;
