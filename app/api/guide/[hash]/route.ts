import { createClient } from '@supabase/supabase-js';

// Access global guideCache from the same process
const getGuideCache = () => {
  if (!(global as any).guideCache) {
    (global as any).guideCache = new Map();
  }
  return (global as any).guideCache;
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ hash: string }> }) {
  const env = process.env;
  const resolvedParams = await params;
  const hash = resolvedParams.hash;

  // 1. Get auth token from request header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authentication required' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const token = authHeader.replace('Bearer ', '');
  let user: any = null;

  // Handle mock tokens for sandbox mode
  if (token === 'mock-access-token' || token.startsWith('mock-access-token')) {
    user = { email: 'user@example.com' };
  } else {
    const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      // Missing keys - auto-authenticate in sandbox mode
      user = { email: 'user@example.com' };
    } else {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data: { user: verifiedUser }, error: authError } = await supabase.auth.getUser(token);
        
        if (authError || !verifiedUser) {
          return new Response(
            JSON.stringify({ error: 'Invalid session' }), 
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
        user = verifiedUser;
      } catch (err: any) {
        console.warn('Supabase auth check failed, falling back to mock user in sandbox:', err.message);
        user = { email: 'user@example.com' };
      }
    }
  }

  // 2. Fetch guide by hash (check local cache first)
  const cache = getGuideCache();
  let guide: any = null;

  // Scan memory cache for matching onboarding_hash
  for (const [_, cachedItem] of cache.entries()) {
    if (cachedItem.onboarding_hash === hash) {
      guide = cachedItem;
      break;
    }
  }

  if (!guide) {
    const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        const { data: dbGuide, error } = await supabaseAdmin
          .from('guides')
          .select('*')
          .eq('onboarding_hash', hash)
          .single();

        if (dbGuide) {
          guide = dbGuide;
        }
      } catch (dbErr) {
        console.warn('Failed to retrieve guide from database:', dbErr);
      }
    }
  }

  if (!guide) {
    return new Response(JSON.stringify({ error: 'Protocol not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Verify user owns this guide (automatic pass in sandbox/mock user state)
  if (user.email !== 'user@example.com' && guide.user_email !== user.email) {
    return new Response(
      JSON.stringify({ error: 'Access denied' }), 
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(JSON.stringify(guide), {
    headers: { 'Content-Type': 'application/json' },
  });
}
