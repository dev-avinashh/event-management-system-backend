import express from "express"
import { loginHandler, signUpHandler } from "../controllers/auth.controllers.js";

const router = express.Router();


router.post("/create", signUpHandler);
router.post("/login", loginHandler);
// router.get("/data", authMiddleware,getData)

export default router;
