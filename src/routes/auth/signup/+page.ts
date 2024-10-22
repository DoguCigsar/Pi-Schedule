import { supabase } from '$lib/supabaseClient';

const { data, error } = await supabase.auth.signUp({
	email: '',
	password: ''
});
