<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { isDay2 } from '$lib/isDay2';
	import { onMount } from 'svelte';
	import { checkAndRedirect } from '$lib/checkhAuth';
	import { _fetchDueHomeworks, _fetchTimetable } from './+page';
	import { getTimeLeft } from '$lib/getTimeLeft';
	let data: any;
	let userName: string = '';
	let dueHomeworks: any[] = [];
	let timetable: any[] = [];
	let is_day2: boolean = isDay2(); // Day 2 indicator

	onMount(() => {
		checkAndRedirect();
		load();
		getUserEmail();
		loadDueHomeworks();
	});

	// Function to load the timetable data initially
	async function load() {
		const { data: timetableData, error } = await supabase.from('time_tables').select();
		if (error) {
			console.error('Error fetching timetables:', error.message);
			return;
		}
		data = timetableData;
	}

	// Function to get the user email
	async function getUserEmail() {
		const { data: user } = await supabase.auth.getUser();
		userName = user?.user?.user_metadata.name || user?.user?.user_metadata.user_name || '';
	}

	// Function to load due homeworks
	async function loadDueHomeworks() {
		dueHomeworks = await _fetchDueHomeworks();
		timetable = await _fetchTimetable();

		// Map course names to due homeworks
		dueHomeworks = dueHomeworks.map((homework) => {
			const periodKey = `period_${homework.class + 1}`;
			const course = timetable[0]?.[periodKey]?.class || 'Class not found';
			return { ...homework, course };
		});
	}
</script>

<div class="container">
	<h2 class="header">
		Hi, {userName}!
	</h2>

	<div class="content">
		<div class="timetable-section">
			<h1 class="header">Timetable</h1>
			<ul class="timetable-list">
				{#if data && data.length > 0}
					{#each data as time_table}
						{#if !is_day2}
							<li class="timetable-item">
								<strong>Period 1</strong>: Room: {time_table.period_1.room}, {time_table.period_1
									.class}, Teacher: {time_table.period_1.teacher}
							</li>
							<li class="timetable-item">
								<strong>Period 2</strong>: Room: {time_table.period_2.room}, {time_table.period_2
									.class}, Teacher: {time_table.period_2.teacher}
							</li>
							<li class="timetable-item">
								<strong>Period 3</strong>: Room: {time_table.period_3.room}, {time_table.period_3
									.class}, Teacher: {time_table.period_3.teacher}
							</li>
							<li class="timetable-item">
								<strong>Period 4</strong>: Room: {time_table.period_4.room}, {time_table.period_4
									.class}, Teacher: {time_table.period_4.teacher}
							</li>
							<hr />
						{:else}
							<li class="timetable-item"><strong>Today is a day 2</strong></li>
							<li class="timetable-item">
								<strong>Period 1</strong>: Room: {time_table.period_2.room}, {time_table.period_2
									.class}, Teacher: {time_table.period_2.teacher}
							</li>
							<li class="timetable-item">
								<strong>Period 2</strong>: Room: {time_table.period_1.room}, {time_table.period_1
									.class}, Teacher: {time_table.period_1.teacher}
							</li>
							<li class="timetable-item">
								<strong>Period 3</strong>: Room: {time_table.period_4.room}, {time_table.period_4
									.class}, Teacher: {time_table.period_4.teacher}
							</li>
							<li class="timetable-item">
								<strong>Period 4</strong>: Room: {time_table.period_3.room}, {time_table.period_3
									.class}, Teacher: {time_table.period_3.teacher}
							</li>
							<hr />
						{/if}
					{/each}
				{:else}
					<li class="timetable-item">No time tables found</li>
				{/if}
			</ul>
			<button class="mdc-button mdc-button--raised" on:click={() => goto('/courses_setup')}>
				<span class="mdc-button__label">Edit Timetable</span>
			</button>
		</div>
		<div class="homework-section">
			<h2 class="header">Due Homeworks</h2>
			<ul class="homework-list">
				{#if dueHomeworks && dueHomeworks.length > 0}
					{#each dueHomeworks as homework}
						<li class="homework-item">
							<strong>{homework.course}</strong>: {homework.data}
							<h5>
								Due on: {new Date(homework.due_date).toLocaleDateString()}
								({getTimeLeft(new Date(homework.due_date))})
							</h5>
						</li>
					{/each}
				{:else}
					<li class="homework-item">No due homeworks</li>
				{/if}
			</ul>
			<button class="mdc-button mdc-button--raised" on:click={() => goto('/homeworks')}>
				<span class="mdc-button__label">Add/Remove Homeworks</span>
			</button>
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Roboto', sans-serif;
		background-color: #f5f5f5;
		margin: 0;
		padding: 0;
	}

	.container {
		padding: 24px;
		max-width: 800px;
		margin: 40px auto;
		background-color: #ffffff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		overflow: hidden;
	}

	.header {
		font-size: 24px;
		font-weight: 500;
		color: #3f51b5;
		margin-bottom: 24px;
		text-align: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.timetable-section {
		flex: 2;
	}

	.homework-section {
		flex: 1;
		background-color: #f9f9f9;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.timetable-list,
	.homework-list {
		list-style-type: none;
		padding: 0;
	}

	.timetable-item,
	.homework-item {
		padding: 12px;
		font-size: 16px;
		border-bottom: 1px solid #ddd;
	}

	.mdc-button {
		width: 100%;
		background-color: #3f51b5;
		color: #ffffff;
		padding: 12px 0;
		font-size: 16px;
		border-radius: 4px;
		margin-top: 16px;
	}

	@media (min-width: 769px) {
		.content {
			flex-direction: row;
		}
	}
</style>
