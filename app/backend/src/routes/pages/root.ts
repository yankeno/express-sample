import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res
    .status(200)
    .header("Content-Type", "text/html")
    .send(`<h1>Hello World!</h1>`);
});

export default router;
