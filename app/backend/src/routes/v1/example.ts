import express from "express";
import { count, findAll, findById } from "../..//controllers/ExampleController";

const router = express.Router();

router.get("/", findAll);
router.get("/find/:id", findById);
router.get("/count", count);

export default router;
