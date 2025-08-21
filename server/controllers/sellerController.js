import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register seller
export const registerSeller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Seller already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new Seller({ name, email, password: hashedPassword });
    await seller.save();

    res.status(201).json({ success: true, message: "Seller registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login seller
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ success: false, message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Send token as cookie (optional)
    res.cookie("sellertoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ success: true, token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Check auth
export const isAuthSeller = async (req, res) => {
  try {
    // ✅ Use req.seller set by middleware
    res.json({ success: true, seller: req.seller });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Logout seller
export const logoutSeller = async (req, res) => {
  try {
    res.clearCookie("sellertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
