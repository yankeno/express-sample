import express from "express";

const router = express.Router();

router.get(
  "/",
  function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.send("example response!");
  }
);

export default router;
