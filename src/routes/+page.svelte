<script>
	import { supabase } from '$lib/supabaseClient';
	export let data;
	let test = {
		'1': 3
	};
	let add = async () => {
		console.log((await supabase.auth.getUser()).data.user);
		await supabase.from('time_tables').insert({ period_1: test });
	};
	let update = async () => {
		await supabase
			.from('time_tables')
			.update({ period_1: test })
			.eq('owner', (await supabase.auth.getUser()).data.user?.id);
	};
</script>

<ul>
	{#each data.homework as homework}
		<li>{homework.id}</li>
	{/each}
	<button on:click={add}>add</button>
</ul>
