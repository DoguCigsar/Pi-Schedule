<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let signup = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
	};
</script>
