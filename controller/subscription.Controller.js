import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import Subscription from '../model/subscription.Model.js';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpaySubscription = async (req, res) => {
  try {
    const { amount, plan } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${uuidv4()}`,
    };

    const order = await razorpay.orders.create(options);

    const newSub = new Subscription({
      userId: req.user.id,
      amount,
      plan,
      provider: 'razorpay',
      razorpayOrderId: order.id,
    });

    await newSub.save();

    res.status(201).json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
