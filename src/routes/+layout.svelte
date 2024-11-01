<script>
	import NotificationSystem from '$lib/NotificationSystem.svelte';
</script>

<svelte:head>
	<title>𝝅 Schedule</title>
</svelte:head>

<slot />

<NotificationSystem />

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
