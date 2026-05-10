import { createClient } from '@supabase/supabase-js';

export async function onRequestGet(context) {
  const { env, params, request } = context;
  const hash = params.hash;

  // 1. Get auth token from request header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authentication required' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const token = authHeader.replace('Bearer ', '');
  
  // 2. Verify token with Supabase (using anon key for verification)
  const supabase = createClient(
    env.VITE_SUPABASE_URL,
    env.VITE_SUPABASE_ANON_KEY
  );
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    return new Response(
      JSON.stringify({ error: 'Invalid session' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Fetch guide by hash (using service role key to bypass RLS)
  const supabaseAdmin = createClient(
    env.VITE_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { data: guide, error } = await supabaseAdmin
      .from('guides')
      .select('*')
      .eq('onboarding_hash', hash)
      .single();

    if (error || !guide) {
      return new Response(JSON.stringify({ error: 'Protocol not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. CRITICAL: Verify THIS user owns this guide
    if (guide.user_email !== user.email) {
      return new Response(
        JSON.stringify({ error: 'Access denied' }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(guide), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
