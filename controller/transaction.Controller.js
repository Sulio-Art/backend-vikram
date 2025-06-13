import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';
import Transaction from '../model/transaction.Model.js';

dotenv.config();

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

export const createPayPalOrder = async (req, res) => {
  const { amount, currency } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: currency, value: amount } }],
  });

  try {
    const order = await client.execute(request);

    const newTransaction = new Transaction({
      userId: req.user.id,
      amount,
      currency,
      provider: 'paypal',
      paypalOrderId: order.result.id,
    });

    await newTransaction.save();

    res.status(201).json({ orderId: order.result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const capturePayPalPayment = async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);

  try {
    const capture = await client.execute(request);

    await Transaction.findOneAndUpdate(
      { paypalOrderId: orderId },
      { status: 'completed', details: capture.result }
    );

    res.status(200).json({ success: true, capture });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
