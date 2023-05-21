import express from "express";
import {
  date,
  category,
  week,
  month,
  latest,
} from "../../controllers/aggregateController";

const router = express.Router();

router.get("/category", category);
router.get("/date", date);
router.get("/week", week);
router.get("/month", month);
router.get("/latest", latest);

export default router;
