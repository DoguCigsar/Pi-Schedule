import { createClient } from '@supabase/supabase-js';
import { PUBLIC_URL, PUBLIC_CLIENT_SECRET } from '$env/static/public';
export const supabase = createClient(PUBLIC_URL, PUBLIC_CLIENT_SECRET);
