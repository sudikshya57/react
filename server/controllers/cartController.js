import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.user?.id;  // from authUser middleware
    const { cartItems } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
