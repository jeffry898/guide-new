import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export const getStripe = () => {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is required for Stripe operations');
    }
    stripeInstance = new Stripe(key, {
      apiVersion: '2026-04-22.dahlia' as any,
    });
  }
  return stripeInstance;
};

export const createCheckoutSession = async ({ 
  packageSlug, 
  professionSlug, 
  userEmail, 
  price,
  metadata = {}
}: { 
  packageSlug: string; 
  professionSlug: string; 
  userEmail: string; 
  price: number;
  metadata?: Record<string, string>;
}) => {
  const stripe = getStripe();
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${professionSlug.toUpperCase()} - AI Survival Protocol`,
            description: `Full AI automation and survival guide for ${professionSlug}.`,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.APP_URL}/onboard/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/product/${packageSlug}`,
    metadata: {
      packageSlug,
      professionSlug,
      userEmail,
      ...metadata
    },
  });
};

export const constructWebhookEvent = (body: string, signature: string) => {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
};

export const retrieveSession = async (sessionId: string) => {
  const stripe = getStripe();
  return await stripe.checkout.sessions.retrieve(sessionId);
};
