import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { PROFESSIONS } from './professions-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client that simulates Supabase using LocalStorage
function createMockSupabaseClient(): any {
  const getLocalData = (key: string) => {
    if (typeof window === 'undefined') {
      const g = globalThis as any;
      if (!g.sb_mock_tables) g.sb_mock_tables = {};
      return g.sb_mock_tables[key] || [];
    }
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const setLocalData = (key: string, data: any) => {
    if (typeof window === 'undefined') {
      const g = globalThis as any;
      if (!g.sb_mock_tables) g.sb_mock_tables = {};
      g.sb_mock_tables[key] = data;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const mockAuth = {
    getUser: async () => {
      if (typeof window === 'undefined') return { data: { user: null }, error: null };
      try {
        const userStr = localStorage.getItem('sb_mock_user');
        if (userStr) {
          return { data: { user: JSON.parse(userStr) }, error: null };
        }
      } catch {}
      return { data: { user: null }, error: null };
    },
    getSession: async () => {
      if (typeof window === 'undefined') return { data: { session: null }, error: null };
      try {
        const userStr = localStorage.getItem('sb_mock_user');
        if (userStr) {
          const user = JSON.parse(userStr);
          return { 
            data: { 
              session: { 
                access_token: 'mock-access-token-' + user.id, 
                user 
              } 
            }, 
            error: null 
          };
        }
      } catch {}
      return { data: { session: null }, error: null };
    },
    signInWithPassword: async ({ email }: { email: string }) => {
      const user = { id: 'mock-uid-' + Math.random().toString(36).substring(2, 11), email };
      if (typeof window !== 'undefined') {
        localStorage.setItem('sb_mock_user', JSON.stringify(user));
        const users = getLocalData('sb_mock_users');
        if (!users.some((u: any) => u.email === email)) {
          users.push(user);
          setLocalData('sb_mock_users', users);
        }
      }
      return { data: { user }, error: null };
    },
    signInWithOtp: async ({ email, options }: { email: string; options?: any }) => {
      const user = { id: 'mock-uid-' + Math.random().toString(36).substring(2, 11), email };
      if (typeof window !== 'undefined') {
        localStorage.setItem('sb_mock_user', JSON.stringify(user));
        const users = getLocalData('sb_mock_users');
        if (!users.some((u: any) => u.email === email)) {
          users.push(user);
          setLocalData('sb_mock_users', users);
        }
      }
      return { data: { user }, error: null };
    },
    signInWithOAuth: async ({ provider, options }: { provider: string; options?: any }) => {
      const user = { id: 'mock-oauth-uid-' + Math.random().toString(36).substring(2, 11), email: 'user@example.com' };
      if (typeof window !== 'undefined') {
        localStorage.setItem('sb_mock_user', JSON.stringify(user));
        const users = getLocalData('sb_mock_users');
        if (!users.some((u: any) => u.email === user.email)) {
          users.push(user);
          setLocalData('sb_mock_users', users);
        }
        if (options?.redirectTo) {
          window.location.href = options.redirectTo;
        }
      }
      return { data: { provider, url: options?.redirectTo }, error: null };
    },
    signUp: async ({ email }: { email: string }) => {
      const user = { id: 'mock-uid-' + Math.random().toString(36).substring(2, 11), email };
      if (typeof window !== 'undefined') {
        localStorage.setItem('sb_mock_user', JSON.stringify(user));
        const users = getLocalData('sb_mock_users');
        if (!users.some((u: any) => u.email === email)) {
          users.push(user);
          setLocalData('sb_mock_users', users);
        }
      }
      return { data: { user }, error: null };
    },
    signOut: async () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sb_mock_user');
      }
      return { error: null };
    },
    onAuthStateChange: (callback: any) => {
      setTimeout(() => {
        const userStr = typeof window !== 'undefined' ? localStorage.getItem('sb_mock_user') : null;
        const user = userStr ? JSON.parse(userStr) : null;
        callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', user ? { user } : null);
      }, 0);
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  };

  const createQueryBuilder = (tableName: string) => {
    let filters: Array<{ col: string; val: any; type: string }> = [];
    let orderCol = '';
    let orderAsc = true;
    let singleRow = false;

    const builder: any = {
      select: (fields?: string) => builder,
      eq: (col: string, val: any) => {
        filters.push({ col, val, type: 'eq' });
        return builder;
      },
      match: (obj: Record<string, any>) => {
        for (const [col, val] of Object.entries(obj)) {
          filters.push({ col, val, type: 'eq' });
        }
        return builder;
      },
      order: (col: string, options?: { ascending?: boolean }) => {
        orderCol = col;
        orderAsc = options?.ascending !== false;
        return builder;
      },
      single: () => {
        singleRow = true;
        return builder;
      },
      insert: async (rows: any | any[]) => {
        const list = Array.isArray(rows) ? rows : [rows];
        const tableKey = `sb_mock_table_${tableName}`;
        const currentData = getLocalData(tableKey);
        
        const newRows = list.map(row => ({
          id: row.id || 'mock-id-' + Math.random().toString(36).substring(2, 11),
          created_at: new Date().toISOString(),
          ...row
        }));
        
        const updated = [...currentData, ...newRows];
        setLocalData(tableKey, updated);
        return { data: singleRow ? newRows[0] : newRows, error: null };
      },
      update: async (fields: any) => {
        const tableKey = `sb_mock_table_${tableName}`;
        let currentData = getLocalData(tableKey);
        
        currentData = currentData.map((item: any) => {
          let matches = true;
          for (const f of filters) {
            if (item[f.col] !== f.val) matches = false;
          }
          if (matches) {
            return { ...item, ...fields };
          }
          return item;
        });
        
        setLocalData(tableKey, currentData);
        return { data: fields, error: null };
      },
      then: (onfulfilled: any) => {
        let data = getLocalData(`sb_mock_table_${tableName}`);
        
        if (tableName === 'professions' && data.length === 0) {
          data = PROFESSIONS.map((p: any) => ({
            id: p.slug,
            name: p.name,
            slug: p.slug,
            price: p.price,
            automation_risk: p.automation_risk,
            industry_data: p.industry_data
          }));
          setLocalData('sb_mock_table_professions', data);
        }
        
        // Apply filters
        for (const f of filters) {
          if (f.type === 'eq') {
            data = data.filter((item: any) => item[f.col] === f.val);
          }
        }
        
        // Sort
        if (orderCol) {
          data.sort((a: any, b: any) => {
            if (a[orderCol] < b[orderCol]) return orderAsc ? -1 : 1;
            if (a[orderCol] > b[orderCol]) return orderAsc ? 1 : -1;
            return 0;
          });
        }
        
        let result = singleRow ? (data[0] || null) : data;
        return Promise.resolve(onfulfilled({ data: result, error: null }));
      }
    };

    return builder;
  };

  return {
    auth: mockAuth,
    from: (tableName: string) => createQueryBuilder(tableName),
    rpc: async (fnName: string, args?: any) => {
      return { data: null, error: { message: 'RPC not implemented in mock' } };
    }
  };
}

// Client-side supabase
export const createClientComponentClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.warn('Supabase environment variables are missing. Using client-side LocalStorage fallback database.');
    }
    return createMockSupabaseClient();
  }
  try {
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Failed to initialize Supabase Browser Client, falling back to mock:', err);
    return createMockSupabaseClient();
  }
};

export async function fetchProfessionsDirectly() {
  const supabase = createClientComponentClient();
  const { data: professions, error } = await supabase
    .from('professions')
    .select('*')
    .order('name');

  if (error) throw error;
  
  // Transform to match front-end expectation
  return (professions || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    automation_risk: p.automation_risk,
    icon: p.industry_data?.icon,
    short_title: p.industry_data?.psychological_title,
    psychological_title: p.industry_data?.psychological_title,
    fear_title: p.industry_data?.fear_title,
    headline: p.industry_data?.fear_title,
    subheadline: p.industry_data?.ad_hook,
    pain_points: p.industry_data?.pain_points,
    tech_stack: p.industry_data?.industry_tools,
    ticket_value: p.industry_data?.avg_revenue_client,
    questionnaire: p.industry_data?.onboarding_questions,
    core_systems: p.industry_data?.geniuzlab_services,
    meta_title: p.industry_data?.meta_title,
    meta_description: p.industry_data?.meta_description
  }));
}

// Server-side supabase (admin/service role)
let supabaseAdminInstance: any = null;
export const getSupabaseAdmin = () => {
  if (!supabaseAdminInstance) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      console.warn('Supabase credentials missing. Admin operations will fall back to in-memory mock client.');
      supabaseAdminInstance = createMockSupabaseClient();
      return supabaseAdminInstance;
    }
    try {
      supabaseAdminInstance = createClient(supabaseUrl, serviceRoleKey);
    } catch (e) {
      console.error('Failed to initialize Supabase Admin Client, falling back to mock:', e);
      supabaseAdminInstance = createMockSupabaseClient();
    }
  }
  return supabaseAdminInstance;
};

// NOTE: supabaseAdmin is now a lazy getter — do NOT call getSupabaseAdmin() at module level
// It was previously exported as a singleton which crashes on Cloudflare Pages edge runtime
// Use getSupabaseAdmin() inside functions only

