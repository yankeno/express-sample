import express from "express";

const router = express.Router();

router.get(
  "/",
  function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(`example request: ${req}`);
    res.send("example response!");
  }
);

export default router;
