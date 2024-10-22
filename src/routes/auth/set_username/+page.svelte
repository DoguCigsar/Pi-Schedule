<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	let setUsername = async (name: string) => {
		const { data, error } = await supabase.auth.updateUser({
			data: { name: name }
		});
	};
</script>
