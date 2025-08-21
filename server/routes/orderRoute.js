import express from "express";
import {
  placeOrderCOD,
  placeOrderStripe,
  getUserOrders,
  getSellerOrders,
} from "../controllers/orderController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

// Cash on Delivery
router.post("/cod", authUser, placeOrderCOD);

// Stripe Checkout
router.post("/stripe", authUser, placeOrderStripe);

// User Orders
router.get("/user", authUser, getUserOrders);

// Seller Orders
router.get("/seller", getSellerOrders);

export default router;
