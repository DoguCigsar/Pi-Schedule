import { supabase } from './supabaseClient';
import { goto } from '$app/navigation';

export const checkAuth = async () => {
	const {
		data: { user }
	} = await supabase.auth.getUser();
	return user ? true : false;
};

export const checkAndRedirect = async () => {
	const isAuthenticated = await checkAuth();
	if (!isAuthenticated) {
		goto('/auth/login');
	}
};
