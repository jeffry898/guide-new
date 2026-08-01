import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'
import { PROFESSIONS } from './professions-data'

// Load environment variables for the script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('Seeding professions...')
  const { error } = await supabase
    .from('professions')
    .upsert(PROFESSIONS, { onConflict: 'slug' })
  
  if (error) {
    console.error('Error seeding professions:', error)
  } else {
    console.log('✅ 20 professions seeded')
  }
}

seed()
