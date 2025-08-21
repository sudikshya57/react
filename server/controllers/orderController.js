import Order from "../models/Order.js";
import Stripe from "stripe";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Place Order with COD
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const validatedItems = items.map(item => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);
      if (!item.name || isNaN(price) || !quantity || !item._id) {
        throw new Error(`Invalid item: ${item.name}`);
      }
      return { ...item, price, quantity };
    });

    const totalAmount = validatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Map items for Order schema
    const orderItems = validatedItems.map(item => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      amount: totalAmount,
      address: address || "",
      paymentType: "COD",
      isPaid: false,
    });

    await order.save();
    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("COD order error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Place Order with Stripe Checkout (INR)
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const validatedItems = items.map(item => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);
      if (!item.name || isNaN(price) || !quantity || !item._id) {
        throw new Error(`Invalid item: ${item.name}`);
      }
      return { ...item, price, quantity };
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: validatedItems.map(item => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
     success_url: `http://localhost:5173/my-orders`,
cancel_url: `http://localhost:5173/cart`,

      metadata: { userId: req.user._id.toString(), address: address || "" },
    });

    const totalAmount = validatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Map items for Order schema
    const orderItems = validatedItems.map(item => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      amount: totalAmount,
      address: address || "",
      paymentType: "ONLINE",
      isPaid: false,
    });

    await order.save();

    res.status(201).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe order error:", error.raw?.message || error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//stripe webhooks to verify payments action: /stripe
export const stripeWebhooks = async (request, response)=>{
//stripe gateway initialize
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const sig = request.headers['stripe-signature'];
let event;

try {
  event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  
} catch (error) {
  response.status(400).send(`Webhook Error: ${error.message}`);
}

//handle the event
switch (event.type) {
  case "payment_intent.succeeded":{
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    //getting session metadata
    const session = await stripeInstance.checkout.sessions.list({ payment_intend: paymentIntentId,
    });

    const { orderId, userId } = session.data[0].metadata;

    //mark payment as paid
    await Order.findByIdAndUpdate(orderId, { isPaid: true});
    //clear user cart
    await User.findByIdAndUpdate(userId, { cartItems: {}  });
     break;
  }
    case "payment_intent.Payment_failed":{
       const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    //getting session metadata
    const session = await stripeInstance.checkout.sessions.list({ payment_intend: paymentIntentId,
    });

    const { orderId } = session.data[0].metadata;
    await Order.findByIdAndDelete(orderId);
    break;
    }

  default:
    console.error(`Unhandled event type ${event.type}`);
    break;
}
response.json({ received: true });
}

// ✅ Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get Seller Orders
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product");
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get seller orders error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
