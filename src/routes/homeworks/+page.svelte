<script lang="ts">
	import { onMount } from 'svelte';
	import { _fetchHomeworks, _insertHomework, _fetchTimetable, _deleteHomework } from './+page';
	import { MDCRipple } from '@material/ripple';
	import { MDCTextField } from '@material/textfield';

	type Homework = {
		class: number | null;
		created_date: string;
		data: string;
		due_date: string | null;
		id: number;
	};

	type Timetable = {
		[key: string]: {
			class: string;
		};
	};

	let homeworks: Homework[] = [];
	let timetable: Timetable[] = [];

	let homeworkData: string = '';
	let selectedClass: number = 0;

	onMount(async () => {
		homeworks = await _fetchHomeworks();
		timetable = await _fetchTimetable();
		console.log(timetable);
		initMDC();
	});

	let insertHomework = async (data: string, classId: number) => {
		await _insertHomework(data, classId);
		homeworks = await _fetchHomeworks();
		homeworkData = '';
	};

	let deleteHomework = async (id: number) => {
		await _deleteHomework(id);
		homeworks = await _fetchHomeworks();
	};

	const periods = ['period_1', 'period_2', 'period_3', 'period_4'];

	function initMDC() {
		const textFields = document.querySelectorAll('.mdc-text-field');
		textFields.forEach((textField) => new MDCTextField(textField));
		const buttons = document.querySelectorAll('.mdc-button');
		buttons.forEach((button) => new MDCRipple(button));
	}
</script>

<div class="container">
	<h1 class="header">Homeworks</h1>
	<ul class="homework-list">
		{#if homeworks && homeworks.length > 0}
			{#each homeworks as homework}
				<li class="homework-item">
					{#if timetable[0]}
						{#if timetable[0]['period_' + (homework.class + 1).toString()]}
							{timetable[0]['period_' + (homework.class + 1).toString()]['class']}: {homework.data}
						{:else}
							<span>Class not found</span>: {homework.data}
						{/if}
					{:else}
						<span>Timetable not found</span>: {homework.data}
					{/if}
					<button
						class="mdc-button mdc-button--raised mdc-button--small"
						on:click={() => deleteHomework(homework.id)}>Delete</button
					>
				</li>
			{/each}
		{:else}
			<p>No homework</p>
		{/if}
	</ul>

	<form
		class="homework-form"
		on:submit|preventDefault={() => insertHomework(homeworkData, selectedClass)}
	>
		<label class="mdc-text-field mdc-text-field--outlined">
			<span class="mdc-floating-label">Homework</span>
			<input
				type="text"
				class="mdc-text-field__input"
				placeholder="Homework"
				bind:value={homeworkData}
			/>
			<span class="mdc-notched-outline">
				<span class="mdc-notched-outline__leading"></span>
				<span class="mdc-notched-outline__notch"></span>
				<span class="mdc-notched-outline__trailing"></span>
			</span>
		</label>
		<label class="mdc-text-field mdc-text-field--outlined">
			<span class="mdc-floating-label">Class</span>
			<select class="mdc-text-field__input" bind:value={selectedClass}>
				{#if timetable[0]}
					{#each periods as period, i}
						{#if timetable[0][period]}
							<option value={i}>{timetable[0][period].class}</option>
						{/if}
					{/each}
					<option value="5">No class</option>
				{:else}
					<option disabled>No classes available</option>
				{/if}
			</select>
			<span class="mdc-notched-outline">
				<span class="mdc-notched-outline__leading"></span>
				<span class="mdc-notched-outline__notch"></span>
				<span class="mdc-notched-outline__trailing"></span>
			</span>
		</label>
		<button type="submit" class="mdc-button mdc-button--raised mdc-button--small">Add</button>
	</form>
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

	.homework-list {
		list-style: none;
		padding: 0;
		margin: 0 0 24px 0;
	}

	.homework-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		border-bottom: 1px solid #e0e0e0;
	}

	.homework-item:last-child {
		border-bottom: none;
	}

	.homework-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.mdc-text-field {
		width: 100%;
		margin-bottom: 16px;
	}

	.mdc-text-field__input {
		padding: 12px;
		font-size: 16px;
	}

	.mdc-button {
		width: auto;
		background-color: #3f51b5;
		color: #ffffff;
		padding: 8px 16px;
		font-size: 14px;
		border-radius: 4px;
	}

	.mdc-button--small {
		padding: 8px 16px;
		font-size: 14px;
	}

	@media (max-width: 768px) {
		.container {
			padding: 16px;
			margin: 20px auto;
		}
	}
</style>
