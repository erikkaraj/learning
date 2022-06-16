import express from "express";
import useRouter from "./users.js";

const router = express.Router();

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.use(useRouter);

export default router;
