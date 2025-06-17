import { createClient } from '@supabase/supabase-js'
import ENV from '../utils/ENV.mjs'

const superbase = createClient(ENV.DATABASE_URL,ENV.DATABASE_KEY);

export default superbase