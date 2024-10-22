<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	export let data;

	let period_1 = {
		// Example data structure
		room: 208,
		class: 'Science',
		teacher: 'Ms. Aman'
	};
	let period_2 = {
		room: 330,
		class: 'ESL-E',
		teacher: 'Ms. Sidrak'
	};
	let period_3 = {
		room: 302,
		class: 'Visual Arts',
		teacher: 'Ms. Marino'
	};
	let period_4 = {
		room: 302,
		class: 'Digital Technology and Innovations',
		teacher: 'Ms. Manson'
	};

	let is_day2: boolean = false; // A bool indicator for whether the day is a day 2 or not

	// Add a new timetable to the database and refresh the data
	let add = async () => {
		const { error } = await supabase
			.from('time_tables')
			.insert({ period_1, period_2, period_3, period_4 });

		if (error) {
			console.error('Error inserting timetable:', error.message);
			return;
		}

		// Refresh the data after insertion
		const { data: updatedData, error: fetchError } = await supabase.from('time_tables').select();

		if (fetchError) {
			console.error('Error fetching updated data:', fetchError.message);
		} else {
			data.time_table.data = updatedData; // Update the UI with the latest data
		}
	};

	let update = async () => {
		const user = (await supabase.auth.getUser()).data.user;
		if (!user) {
			console.error('No user is logged in');
			return;
		}

		const { error } = await supabase
			.from('time_tables')
			.update({ period_1, period_2, period_3, period_4 })
			.eq('owner', user.id);

		if (error) {
			console.error('Error updating timetable:', error.message);
		}
	};
</script>

<!-- Render the time tables -->
<ul>
	{#if data && data.time_table && data.time_table.data}
		{#each data.time_table.data as time_table}
			{#if !is_day2}
				<li>
					<strong>Period 1</strong>: Room {time_table.period_1.room}, {time_table.period_1.class},
					Teacher: {time_table.period_1.teacher}
				</li>
				<li>
					<strong>Period 2</strong>: Room {time_table.period_2.room}, {time_table.period_2.class},
					Teacher: {time_table.period_2.teacher}
				</li>
				<li>
					<strong>Period 3</strong>: Room {time_table.period_3.room}, {time_table.period_3.class},
					Teacher: {time_table.period_3.teacher}
				</li>
				<li>
					<strong>Period 4</strong>: Room {time_table.period_4.room}, {time_table.period_4.class},
					Teacher: {time_table.period_4.teacher}
				</li>
				<hr />
			{:else}
				<li>
					<strong>Period 1</strong>: Room {time_table.period_2.room}, {time_table.period_2.class},
					Teacher: {time_table.period_2.teacher}
				</li>
				<li>
					<strong>Period 2</strong>: Room {time_table.period_1.room}, {time_table.period_1.class},
					Teacher: {time_table.period_1.teacher}
				</li>
				<li>
					<strong>Period 3</strong>: Room {time_table.period_4.room}, {time_table.period_4.class},
					Teacher: {time_table.period_4.teacher}
				</li>
				<li>
					<strong>Period 4</strong>: Room {time_table.period_3.room}, {time_table.period_3.class},
					Teacher: {time_table.period_3.teacher}
				</li>
				<hr />
			{/if}
		{/each}
	{:else}
		<li>No time tables found</li>
	{/if}

	<button on:click={add}>Add</button>
</ul>
