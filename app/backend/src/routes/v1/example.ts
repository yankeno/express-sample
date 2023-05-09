import express from "express";
import {
  count,
  store,
  findAll,
  findById,
  edit,
  destroy,
} from "../..//controllers/ExampleController";

const router = express.Router();

router.get("/", findAll);
router.post("/create", store);
router.put("/update/:id", edit);
router.delete("/delete/:id", destroy);
router.get("/find/:id", findById);
router.get("/count", count);

export default router;
