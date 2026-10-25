import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const chiave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

if (!url || !chiave) {
  throw new Error('Mancano VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY (vedi app/.env.example).')
}

export const supabase = createClient(url, chiave, {
  // Solo /regia fa login; telefoni e schermo restano anonimi.
  auth: { persistSession: true, autoRefreshToken: true },
})
