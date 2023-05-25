import express from "express";
import { index } from "../../controllers/categoryController";

const router = express.Router();

router.get("/", index);

export default router;
