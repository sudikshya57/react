import express from "express";
import { loginSeller, registerSeller, isAuthSeller, logoutSeller } from "../controllers/sellerController.js";
import authSeller from "../middleware/authSeller.js";

const router = express.Router();

// Register seller
router.post("/register", registerSeller);

// Login seller
router.post("/login", loginSeller);

// Auth check
router.get("/is-auth", authSeller, isAuthSeller);

// Logout seller
router.post("/logout", logoutSeller);

export default router;
