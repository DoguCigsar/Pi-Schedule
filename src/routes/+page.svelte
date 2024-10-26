<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { isDay2 } from '$lib/isDay2';
	import { onMount } from 'svelte';
	import { checkAndRedirect } from '$lib/checkhAuth';
	import { _fetchDueHomeworks, _fetchTimetable } from './+page';
	import { getTimeLeft } from '$lib/getTimeLeft';
	import { acceptSharedHomework, rejectSharedHomework } from '$lib/sharedHomeworkHandler';
	import { _getSharedHomework } from './share_homework/+page';
	let data: any;
	let userName: string = '';
	let dueHomeworks: any[] = [];
	let timetable: any[] = [];
	let sharedHomework: any[] = [];
	let showNotification: boolean = false;
	let showPopup: boolean = false;
	let selectedPeriod: number | undefined = undefined;
	let selectedHomework: any = null;

	onMount(() => {
		checkAndRedirect();
		load();
		getUserEmail();
		loadDueHomeworks();
		loadSharedHomework();
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

	// Function to load shared homework
	async function loadSharedHomework() {
		sharedHomework = await _getSharedHomework();
		if (sharedHomework && sharedHomework.length > 0) {
			showNotification = true;
		}
	}

	// Function to show popup with homework details
	function showAcceptPopup(homework: any) {
		selectedHomework = homework;
		showPopup = true;
	}

	// Function to accept shared homework
	async function acceptHomework() {
		if (selectedHomework && selectedPeriod !== undefined) {
			await acceptSharedHomework(selectedHomework.id, selectedPeriod);
			showPopup = false;
			sharedHomework = sharedHomework.filter((hw) => hw.id !== selectedHomework.id);
			if (sharedHomework.length === 0) {
				showNotification = false;
			}
			loadDueHomeworks(); // Refresh due homeworks
		}
	}

	// Function to reject shared homework
	function rejectHomework(homeworkId: number) {
		rejectSharedHomework(homeworkId);
		sharedHomework = sharedHomework.filter((hw) => hw.id !== homeworkId);
		if (sharedHomework.length === 0) {
			showNotification = false;
		}
	}

	let is_day2: boolean = isDay2(); // Day 2 indicator
</script>

<div class="container">
	{#if showNotification}
		<div class="notification-container">
			{#each sharedHomework as homework}
				<div class="notification-bubble">
					<p>You have a new shared homework!</p>
					<button on:click={() => showAcceptPopup(homework)}>Accept</button>
					<button on:click={() => rejectHomework(homework.id)}>Reject</button>
				</div>
			{/each}
		</div>
	{/if}
	{#if showPopup}
		<div class="popup-overlay">
			<div class="popup">
				<h2>Homework Details</h2>
				<p><strong>Message:</strong> {selectedHomework.message}</p>
				<p><strong>Details:</strong> {selectedHomework.data}</p>
				<p><strong>Due Date:</strong> {new Date(selectedHomework.due_date).toLocaleDateString()}</p>
				<label for="period">Select Period:</label>
				<select id="period" bind:value={selectedPeriod}>
					<option value={undefined}>Select a period</option>
					{#each [0, 1, 2, 3] as period}
						<option value={period}
							>{timetable[0]?.[`period_${period + 1}`]?.class || `Period ${period}`}</option
						>
					{/each}
				</select>
				<div class="popup-buttons">
					<button on:click={acceptHomework}>Accept</button>
					<button on:click={() => (showPopup = false)}>Cancel</button>
				</div>
			</div>
		</div>
	{/if}

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
								({getTimeLeft(new Date(homework.due_date))} Days)
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

	.notification-container {
		position: fixed;
		top: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px; /* Space between notification bubbles */
		z-index: 1000;
	}

	.notification-bubble {
		background-color: #ffeb3b;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.notification-bubble p {
		margin: 0 0 8px 0;
		font-size: 16px;
	}

	.notification-bubble button {
		margin-right: 8px;
		padding: 8px 16px;
		font-size: 14px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.notification-bubble button:first-of-type {
		background-color: #4caf50;
		color: white;
	}

	.notification-bubble button:last-of-type {
		background-color: #f44336;
		color: white;
	}

	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1001;
	}

	.popup {
		background-color: #ffffff;
		padding: 24px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 90%;
		max-width: 500px;
	}

	.popup h2 {
		margin-top: 0;
	}

	.popup-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 16px;
	}

	.popup-buttons button {
		padding: 8px 16px;
		font-size: 14px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.popup-buttons button:first-of-type {
		background-color: #4caf50;
		color: white;
	}

	.popup-buttons button:last-of-type {
		background-color: #f44336;
		color: white;
	}

	@media (min-width: 769px) {
		.content {
			flex-direction: row;
		}
	}
</style>
