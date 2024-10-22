import { supabase } from '$lib/supabaseClient';
const { error } = await supabase.auth.signOut();
