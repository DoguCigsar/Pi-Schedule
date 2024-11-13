<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { _getSharedHomework } from '$lib/../routes/share_homework/+page';
	import { acceptSharedHomework, rejectSharedHomework } from '$lib/sharedHomeworkHandler';
	import { onMount } from 'svelte';

	let sharedHomework: any[] = [];
	let showNotification: boolean = false;
	let showPopup: boolean = false;
	let selectedPeriod: number | undefined = undefined;
	let selectedHomework: any = null;
	let timetable: any[] = [];

	onMount(() => {
		/**
		 * Function to be executed when the component is mounted.
		 * It loads shared homework.
		 */
		loadSharedHomework();
	});

	/**
	 * Loads shared homework from the database and updates the state.
	 */
	async function loadSharedHomework() {
		sharedHomework = await _getSharedHomework();
		if (sharedHomework && sharedHomework.length > 0) {
			showNotification = true;
		}
	}

	/**
	 * Shows a popup with homework details.
	 * @param {any} homework - The homework data to show in the popup.
	 */
	function showAcceptPopup(homework: any) {
		selectedHomework = homework;
		showPopup = true;
	}

	/**
	 * Accepts shared homework and updates the state.
	 */
	async function acceptHomework() {
		if (selectedHomework && selectedPeriod !== undefined) {
			await acceptSharedHomework(selectedHomework.id, selectedPeriod);
			showPopup = false;
			sharedHomework = sharedHomework.filter((hw) => hw.id !== selectedHomework.id);
			if (sharedHomework.length === 0) {
				showNotification = false;
			}
			// Refresh due homeworks if needed
			location.reload(); // Refresh the page
		}
	}

	/**
	 * Rejects shared homework and updates the state.
	 * @param {number} homeworkId - The ID of the homework to reject.
	 */
	function rejectHomework(homeworkId: number) {
		rejectSharedHomework(homeworkId);
		sharedHomework = sharedHomework.filter((hw) => hw.id !== homeworkId);
		if (sharedHomework.length === 0) {
			showNotification = false;
		}
	}

	// Get timetable data
	supabase
		.from('time_tables')
		.select()
		.then(({ data, error }) => {
			if (error) {
				console.error('Error fetching timetables:', error.message);
				return;
			}
			timetable = data;
		});
</script>

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

<style>
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
</style>
