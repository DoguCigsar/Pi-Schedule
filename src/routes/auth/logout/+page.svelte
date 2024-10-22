<script>
	import { supabase } from '$lib/supabaseClient';
	let signout = async () => {
		const { error } = await supabase.auth.signOut();
	};
	signout();
</script>
