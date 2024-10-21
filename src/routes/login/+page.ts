// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { supabase } from '$lib/supabaseClient';

export const prerender = true;

const userSetup = await supabase.auth.signInWithPassword({
	email: '',
	password: ''
});
