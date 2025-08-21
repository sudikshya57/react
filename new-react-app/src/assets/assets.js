// src/assets/assets.js

// === ICONS ===
import logo from './images/logo.png';
import search_icon from './images/search_icon.png';
import nav_cart_icon from './images/nav_cart_icon.png';
import menu_icon from './images/menu_icon.png';
import profile_icon from './images/profile_icon.png';
import profile from './images/profile.png';
import profile_small from './images/profile_small.png';
import white_arrow_icon from './images/white_arrow_icon.png';
import black_arrow_icon from './images/black_arrow_icon.png';
import add_cart_icon from './images/add_cart_icon.png';
import delivery_icon from './images/delivery_icon.png';
import return_icon from './images/return_icon.png'; 
import support_icon from './images/support_icon.png';
import secure_payment_icon from './images/secure_payment_icon.png';
import delete_icon from './images/delete_icon.png';
import arrow_right_icon_colored from './images/arrow_right_icon_colored.png';
import add_icon from './images/add_icon.png';
import product_list_icon from './images/product_list_icon.png';
import order_icon from './images/order_icon.png';
import box_icon from './images/box_icon.png';

// === CATEGORY IMAGES ===
import box_kitchen_image from './images/box_kitchen_image.png';
import box_cleaning_image from './images/box_cleaning_image.png';
import box_bathroom_image from './images/box_bathroom_image.png';
import box_fragrance_image from './images/box_fragrance_image.png';
import box_personalcare_image from './images/box_personalcare_image.png';

// === PRODUCT IMAGES ===
import loofah_image from './images/loofah_image.png';
import wooden_cooking_utensils_image from './images/wooden_cooking_utensils_image.png';
import woven_basket_image from './images/woven_basket_image.png';
import candle_fragrance_image from './images/candle_fragrance_image.png';
import personalcare_image from './images/personalcare_image.png';
import add_address_image from './images/add_address_image.png';

import toilet_paper_image from './images/toilet_paper_image.png';
import serum_image from './images/serum_image.png';
import freshner_image from './images/freshner_image.png';
import candle_set_image from './images/candle_set_image.png';
import soap_image from './images/soap_image.png';
import toothbrush_image from './images/toothbrush_image.png';
import cleaning_image from './images/cleaning_image.png';

import bottom_banner from './images/bottom_banner.png';
import bottom_banner_sm from './images/bottom_banner_sm.png';

import upload_area from './images/upload_area.png';

// ========= IMAGE EXPORT =========
const images = {
  logo,
  search_icon,
  nav_cart_icon,
  menu_icon,
  profile_icon,
  profile,
  profile_small,
  white_arrow_icon,
  black_arrow_icon,
  add_cart_icon,
  delivery_icon,
  return_icon,
  support_icon,
  secure_payment_icon,
  box_kitchen_image,
  box_cleaning_image,
  box_bathroom_image,
  box_fragrance_image,
  box_personalcare_image,
  loofah_image,
  wooden_cooking_utensils_image,
  woven_basket_image,
  candle_fragrance_image,
  personalcare_image,
  toilet_paper_image,
  serum_image,
  freshner_image,
  candle_set_image,
  soap_image,
  toothbrush_image,
  cleaning_image,
  bottom_banner,
  bottom_banner_sm,
  delete_icon,
  arrow_right_icon_colored,
  add_address_image,
  add_icon,
  product_list_icon,
  order_icon,
  upload_area,
  box_icon,
};

export const categories = [
  {
    text: 'Kitchen Essentials',
    path: 'Kitchen',
    image: box_kitchen_image,
    bgColor: '#f0f0f0',
  },
  {
    text: 'Cleaning Supplies',
    path: 'Cleaning',
    image: box_cleaning_image,
    bgColor: '#f0f0f0',
  },
  {
    text: 'Bathroom Basics',
    path: 'Bathroom',
    image: box_bathroom_image,
    bgColor: '#f0f0f0',
  },
  {
    text: 'Home Fragrance & Decor Soy Wax Candles',
    path: 'Fragrance',
    image: box_fragrance_image,
    bgColor: '#f0f0f0',
  },
  {
    text: 'Personal Care Natural Deodorant',
    path: 'PersonalCare',
    image: box_personalcare_image,
    bgColor: '#f0f0f0',
  },
];

export const dummyProducts = [
  {
    id: 1,
    name: 'Loofah Sponges',
    price: 259,
    image: [loofah_image],
    description: 'Natural, biodegradable sponges made from the fibrous interior of loofah gourds, used for cleaning or exfoliating.',
    inStock: true, 
    category: 'Bathroom',
  },
  {
    id: 2,
    name: 'Wooden Cooking Utensils',
    price: 1289,
    image: [wooden_cooking_utensils_image],
    description: 'Set of kitchen tools (spoons, spatulas, and ladles) crafted from wood, ideal for cooking and serving food.',
    inStock: true,
    category: 'Kitchen',
  },
  {
    id: 3,
    name: 'Woven Basket',
    price: 999,
    image: [woven_basket_image],
    description: 'A handcrafted basket made from natural materials like bamboo or straw, featuring a woven pattern and decorative elements.',
    inStock: true,
    category: 'Kitchen',
  },
  {
    id: 4,
    name: 'Candles',
    price: 1119,
    image: [candle_fragrance_image],
    description: 'Set of scented candles in glass jars, used for creating a relaxing and cozy ambiance.',
    inStock: true,
    category: 'Fragrance',
  },
  {
    id: 5,
    name: 'Lip Balm',
    price: 809,
    image: [personalcare_image],
    description: 'Natural whipped soap by Barnes Hill, enriched with castor oil and vitamin E, designed for gentle cleansing and hydration.',
    inStock: true,
    category: 'PersonalCare',
  },
  {
    id: 6,
    name: 'Eco-Friendly Toilet Paper',
    price: 699,
    image: [toilet_paper_image],
    description: 'Sustainably sourced, biodegradable toilet paper made from recycled materials — gentle on you and the planet.',
    inStock: true,
    category: 'Bathroom',
  },
  {
    id: 7,
    name: 'Herbal Face Serum',
    price: 1199,
    image: [serum_image],
    description: 'A hydrating face serum infused with natural botanicals to nourish and rejuvenate skin.',
    inStock: true,
    category: 'PersonalCare',
  },
  {
    id: 8,
    name: 'Natural Room Freshener',
    price: 499,
    image: [freshner_image],
    description: 'Non-toxic, plant-based room freshener spray that leaves your space smelling clean and fresh.',
    inStock: true,
    category: 'Fragrance',
  },
  {
    id: 9,
    name: 'Soy Wax Candle Set',
    price: 899,
    image: [candle_set_image],
    description: 'Elegant handmade soy wax candles for a calming and aromatic ambiance at home.',
    inStock: true,
    category: 'Fragrance',
  },
  {
    id: 10,
    name: 'Handmade Organic Soap',
    price: 349,
    image: [soap_image],
    description: 'Cold-processed organic soap bar made with natural oils and no harsh chemicals.',
    inStock: true,
    category: 'PersonalCare',
  },
  {
    id: 11,
    name: 'Bamboo Toothbrush Set',
    price: 299,
    image: [toothbrush_image],
    description: 'Eco-friendly toothbrushes made from biodegradable bamboo — a sustainable oral care essential.',
    inStock: true,
    category: 'Bathroom',
  },
  {
    id: 12,
    name: 'Natural Non-Toxic Cleaner',
    price: 499,
    image: [cleaning_image],
    description: 'Eco-friendly toothbrushes made from biodegradable bamboo — a sustainable oral care essential.',
    inStock: true,
    category: 'Cleaning',
  },
];

export const features = [
  {
    icon: delivery_icon,
    title: 'Free Delivery',
    description: 'Enjoy free delivery on all orders over ₹999. We ensure your products reach you quickly and safely.',
  },
  {
    icon: return_icon,
    title: 'Easy Returns',
    description: 'Shop with confidence! We offer hassle-free returns within 30 days of purchase.',
  },
  {
    icon: support_icon,
    title: '24/7 Support',
    description: 'Our customer support team is available 24/7 to assist you with any queries or concerns.',
  },
  {
    icon: secure_payment_icon,
    title: 'Secure Payment',
    description: 'Your payment information is safe with us. We use industry-standard encryption to protect your data.',
  },
];

export const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { text: 'Home', url: '#' },
      { text: 'New Launch', url: '#' },
      { text: 'Offers & Deals', url: '#' },
      { text: 'Contact Us', url: '#' },
      { text: 'FAQs', url: '#' },
    ],
  },
  {
    title: 'Need Help?',
    links: [
      { text: 'Delivery Information', url: '#' },
      { text: 'Return & Refund Policy', url: '#' },
      { text: 'Payment Methods', url: '#' },
      { text: 'Track your Order', url: '#' },
      { text: 'Contact Us', url: '#' },
    ],
  },
];

export const dummyAddress = [
  {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    country: "USA",
  },
  {
    street: "456 Elm St",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
  },
];

export const dummyOrders = [
  {
    id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d9769c5ca61644",
    items: [
      {
        product: dummyProducts[2], // Woven Basket
        quantity: 1,
        id: "67e2589a8f87e63366786401"
      }
    ],
     amount: 999,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z"
  },

  {
    id: "67e2589a8f87e63366786402",
    userId: "67b5880e4d9769c5ca61644",
    items: [
      {
        product: dummyProducts[7], // Natural Room Freshener
        quantity: 3,
        id: "67e2589a8f87e63366786403"
      }
    ],
    amount: 998,
    address: dummyAddress[1],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-26T10:20:00.000Z",
    updatedAt: "2025-03-26T10:21:00.000Z"
  }
];


const Assets = {
  images,
  categories,
  dummyProducts,
  dummyAddress,
  dummyOrders,
};

export default Assets ;
