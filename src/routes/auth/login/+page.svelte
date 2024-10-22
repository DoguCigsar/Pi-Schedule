<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	let email: string;
	let password: string;
	let login_failed: boolean = false;
	let login = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password
			});

			if (error) {
				// Handle expected login error
				console.error('Error signing in:', error.message);
				login_failed = true;
			} else {
				// Handle successful sign-in
				console.log('Signed in successfully:', data);
				login_failed = false;
			}
		} catch (err) {
			// Handle any unexpected weird errors
			console.error('Unexpected error:', err);
		}
	};
</script>

{#if login_failed}
	<h1>Invalid Credentials</h1>
{/if}

<input bind:value={email} />
<input bind:value={password} />

<button on:click={() => login(email, password)}></button>
