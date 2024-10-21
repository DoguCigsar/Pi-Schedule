import { supabase } from '$lib/supabaseClient';
const { data, error } = await supabase.auth.updateUser({
	data: { name: '' }
});
