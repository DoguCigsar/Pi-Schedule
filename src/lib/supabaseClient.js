import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
export const supabase = createClient(env.PUBLIC_URL, env.PUBLIC_CLIENT_SECRET);
