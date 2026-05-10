import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  console.log('--- Initializing Checkout Session ---');
  console.log('Environment Check:');
  console.log('- Stripe Key Available:', !!env.STRIPE_SECRET_KEY);
  console.log('- Supabase URL Available:', !!env.VITE_SUPABASE_URL);
  console.log('- Supabase Service Role Key Available:', !!env.SUPABASE_SERVICE_ROLE_KEY);
  console.log('- App URL Available:', !!env.APP_URL);

  if (!env.STRIPE_SECRET_KEY) {
    console.error('CRITICAL ERROR: STRIPE_SECRET_KEY is missing from environment variables.');
    return new Response(JSON.stringify({ 
      error: 'SYSTEM ERROR: Stripe configuration missing.',
      detail: 'ST_001'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!env.VITE_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('CRITICAL ERROR: Supabase configuration is missing.');
    return new Response(JSON.stringify({ 
      error: 'SYSTEM ERROR: Database configuration missing.',
      detail: 'DB_001'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' as any, // Use a standard version
  });
  
  const supabase = createClient(
    env.VITE_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const payload = await request.json();
    console.log('Received Payload:', JSON.stringify(payload, null, 2));

    const { packageSlug, professionSlug, userEmail, onboardingAnswers, price } = payload;

    if (!professionSlug || !userEmail || !price) {
      console.warn('VALIDATION ERROR: Missing required fields in payload.');
      return new Response(JSON.stringify({ 
        error: 'INVALID REQUEST: Missing required fields (email, profession, or price).' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`Creating Stripe session for ${userEmail} (${professionSlug})`);

    let session;
    try {
      session = await stripe.checkout.sessions.create({
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
              unit_amount: Math.round(price * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${env.APP_URL}/onboard/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.APP_URL}/product/${professionSlug}`,
        metadata: {
          packageSlug,
          professionSlug,
          userEmail,
          onboardingAnswers: JSON.stringify(onboardingAnswers || [])
        },
      });
      console.log('Stripe Session Created:', session.id);
    } catch (stripeError: any) {
      console.error('STRIPE API ERROR:', stripeError);
      return new Response(JSON.stringify({ 
        error: `PAYMENT SYSTEM ERROR: ${stripeError.message}`,
        detail: 'ST_002'
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Save pending purchase
    console.log('Saving pending purchase to Supabase...');
    const { error: dbError } = await supabase.from('purchases').insert({
      stripe_session_id: session.id,
      user_email: userEmail,
      profession_slug: professionSlug,
      amount: price,
      status: 'pending'
    });

    if (dbError) {
      console.error('SUPABASE INSERT ERROR:', dbError);
    } else {
      console.log('Pending purchase saved successfully.');
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('UNEXPECTED SERVER ERROR:', error);
    return new Response(JSON.stringify({ 
      error: `UNEXPECTED SYSTEM ERROR: ${error.message}`,
      detail: 'UX_001'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
