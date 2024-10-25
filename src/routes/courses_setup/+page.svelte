<script lang="ts">
	import { onMount } from 'svelte';
	import { checkAndRedirect } from '$lib/checkhAuth';
	import { _fetchTimetables, _addTimetable, _updateTimetable } from './+page';
	import { MDCRipple } from '@material/ripple';
	import { MDCTextField } from '@material/textfield';

	let courses_initiated = false;

	let periods = [
		{ room: '', class: '', teacher: '' },
		{ room: '', class: '', teacher: '' },
		{ room: '', class: '', teacher: '' },
		{ room: '', class: '', teacher: '' }
	];

	onMount(() => {
		checkAndRedirect();
		initMDC();
		fetchTimetables();
	});

	async function fetchTimetables() {
		try {
			const data = await _fetchTimetables();
			if (data && data.length === 0) {
			} else {
				courses_initiated = true;
			}
			console.log(courses_initiated);
			console.log(data);
		} catch (error) {
			console.error('Error fetching timetables:', error);
		}
	}

	function initMDC() {
		const textFields = document.querySelectorAll('.mdc-text-field');
		textFields.forEach((textField) => new MDCTextField(textField));
		const buttons = document.querySelectorAll('.mdc-button');
		buttons.forEach((button) => new MDCRipple(button));
	}
</script>

<div class="container">
	<h1 class="header">Timetable Setup</h1>
	<div class="input-groups">
		{#each Array(4)
			.fill(0)
			.map((_, i) => i) as i}
			<div class="input-group">
				<h2 class="period-title">Period {i + 1}</h2>
				<label class="mdc-text-field mdc-text-field--outlined">
					<span class="mdc-floating-label">Room</span>
					<input
						type="text"
						bind:value={periods[i].room}
						class="mdc-text-field__input"
						placeholder="Room"
					/>
					<span class="mdc-notched-outline">
						<span class="mdc-notched-outline__leading"></span>
						<span class="mdc-notched-outline__notch"></span>
						<span class="mdc-notched-outline__trailing"></span>
					</span>
				</label>
				<label class="mdc-text-field mdc-text-field--outlined">
					<span class="mdc-floating-label">Class</span>
					<input
						type="text"
						bind:value={periods[i].class}
						class="mdc-text-field__input"
						placeholder="Class"
					/>
					<span class="mdc-notched-outline">
						<span class="mdc-notched-outline__leading"></span>
						<span class="mdc-notched-outline__notch"></span>
						<span class="mdc-notched-outline__trailing"></span>
					</span>
				</label>
				<label class="mdc-text-field mdc-text-field--outlined">
					<span class="mdc-floating-label">Teacher</span>
					<input
						type="text"
						bind:value={periods[i].teacher}
						class="mdc-text-field__input"
						placeholder="Teacher"
					/>
					<span class="mdc-notched-outline">
						<span class="mdc-notched-outline__leading"></span>
						<span class="mdc-notched-outline__notch"></span>
						<span class="mdc-notched-outline__trailing"></span>
					</span>
				</label>
			</div>
		{/each}
	</div>
	<p class="warning-text">Please input according to a day 1 schedule</p>
	{#if !courses_initiated}
		<button class="mdc-button mdc-button--raised" on:click={() => _addTimetable(periods)}>
			<span class="mdc-button__label">Add</span>
		</button>
	{:else}
		<button class="mdc-button mdc-button--raised" on:click={() => _updateTimetable(periods)}>
			<span class="mdc-button__label">Update</span>
		</button>
	{/if}
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

	.input-groups {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 16px;
	}

	.input-group {
		display: flex;
		flex-direction: column;
	}

	.period-title {
		font-size: 18px;
		font-weight: 500;
		color: #3f51b5;
		margin-bottom: 8px;
	}

	.mdc-text-field {
		width: 100%;
		margin-bottom: 16px;
		display: flex;
		align-items: center;
	}

	.mdc-text-field__input {
		padding: 12px;
		font-size: 16px;
		flex: 1;
	}

	.mdc-floating-label {
		margin-right: 16px;
	}

	.mdc-notched-outline__notch {
		padding: 0 8px;
	}

	.mdc-button {
		width: 100%;
		background-color: #3f51b5;
		color: #ffffff;
		padding: 12px 0;
		font-size: 16px;
		border-radius: 4px;
	}

	@media (max-width: 768px) {
		.container {
			padding: 16px;
			margin: 20px auto;
		}
	}
	.warning-text {
		padding-left: 10px;
		color: red;
		font-size: 14px;
	}
</style>
