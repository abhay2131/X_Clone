import express from "express";
import {
  signup,
  signin,
  signout,
  getUser,
} from "../controllers/auth.controllers.js";

import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/getUser", protectRoute, getUser);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/signout", signout);

// router.post("/signup");

// router.post("/login");

// router.post("/logout");

export default router;
