<script>
	import NotificationSystem from '$lib/NotificationSystem.svelte';
	import { supabase } from '$lib/supabaseClient';
	let userName = '';
	async function getUserEmail() {
		const { data: user } = await supabase.auth.getUser();
		userName = user?.user?.user_metadata.name || user?.user?.user_metadata.user_name || '';
	}
	$: getUserEmail();
</script>

<svelte:head>
	<title>𝝅 Schedule</title>
</svelte:head>

<slot />

<NotificationSystem />
<h4>Logged in as {userName}</h4>
<h4><a href="/auth/profile">Profile</a> <a href="/auth/logout">Logout</a></h4>
<h4>© 2024 Dogu Cigsar/COS-Soft</h4>
<h5><a href="/privacy_policy">Privacy Policy</a></h5>

<style>
	h4,
	h5 {
		text-align: center;
	}
	h5,
	a {
		text-decoration: none;
	}
</style>
