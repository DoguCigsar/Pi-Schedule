<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	let email: string;
	let user_name: string;
	let password: string;
	let signup = async (email: string, password: string, user_name: string) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						user_name: user_name
					}
				}
			});
			if (error) {
				console.error(error);
			}
		} catch (err) {
			console.error('Unexpected error ', err);
		}
	};
</script>

<input bind:value={email} />
<input bind:value={user_name} />
<input bind:value={password} />

<button on:click={() => signup(email, password, user_name)}>SignUP</button>
