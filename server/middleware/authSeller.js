import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

const authSeller = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const seller = await Seller.findById(decoded.id).select("-password");
    if (!seller) return res.status(401).json({ success: false, message: "Seller not found" });

    req.seller = seller; // ✅ attach seller object
    next();
  } catch (err) {
    console.error("Auth seller error:", err);
    res.status(401).json({ success: false, message: "Not Authorized as Seller" });
  }
};

export default authSeller;
