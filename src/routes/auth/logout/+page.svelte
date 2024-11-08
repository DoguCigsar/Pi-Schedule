<script>
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let signout = async () => {
		const { error } = await supabase.auth.signOut();
	};
	signout();

	// Redirect to the login page
	goto('/auth/login');
</script>
