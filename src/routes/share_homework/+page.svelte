<script lang="ts">
	import { onMount } from 'svelte';
	import { _shareHomework, _getSharedHomework, _fetchSpecificHomework } from './+page';
	import { page } from '$app/stores';
	import { getTimeLeft } from '$lib/getTimeLeft';
	import { goto } from '$app/navigation';
	import { checkAndRedirect } from '$lib/checkhAuth';

	const id = Number($page.url.searchParams.get('id'));
	let receiver: string = '';
	let homework: any;
	let message: string = '';
	let confirmationMessage: string = '';

	/**
	 * Shares the homework with the specified receiver.
	 * @param {number} id - The ID of the homework to share.
	 * @param {string} receiver - The email of the receiver.
	 * @param {string} message - A message to include with the shared homework.
	 */
	let shareHomework = async (id: number, receiver: string, message: string) => {
		if (!receiver) {
			confirmationMessage = 'Receiver is required';
			return;
		}
		await _shareHomework(id, receiver, message);
		receiver = '';
		message = '';
		confirmationMessage = 'Shared successfully';
		goto('/');
	};

	/**
	 * Fetches the specific homework by its ID.
	 * @param {number} id - The ID of the homework to fetch.
	 * @returns {Promise<any>} - A promise that resolves to the fetched homework data.
	 */
	let fetchSpecificHomework = async (id: number) => {
		const homework = await _fetchSpecificHomework(id);
		return homework;
	};

	/**
	 * Lifecycle function that runs when the component is mounted.
	 */
	onMount(async () => {
		checkAndRedirect();
		await fetchSpecificHomework(id).then((data) => {
			homework = data;
		});
		console.log(homework);
	});
</script>

<main class="container">
	<h1 class="header">Share homework</h1>
	{#if homework !== undefined && homework !== null && homework !== ''}
		<p>{homework[0].data}</p>
		<p>
			Due on: {new Date(homework[0].due_date).toLocaleDateString()} ({getTimeLeft(
				new Date(homework[0].due_date)
			)})
		</p>
	{/if}
	<input type="text" bind:value={receiver} placeholder="Receiver" class="input-field" />
	<input
		type="text"
		bind:value={message}
		placeholder="Send a beautiful message to your beautiful friend"
		class="input-field"
	/>
	<button
		on:click={() => shareHomework(id, receiver, message)}
		class="mdc-button mdc-button--raised"
	>
		Share homework
	</button>
	{#if confirmationMessage}
		<p class="confirmation">{confirmationMessage}</p>
	{/if}
</main>

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

	.input-field {
		width: calc(100% - 24px); /* Adjust width to prevent overflow */
		padding: 12px;
		margin-bottom: 16px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 16px;
		box-sizing: border-box; /* Ensure padding and border are included in the width */
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

	.confirmation {
		font-size: 16px;
		margin-top: 16px;
		text-align: center;
	}

	@media (max-width: 768px) {
		.container {
			padding: 16px;
			margin: 20px auto;
		}

		.header {
			font-size: 20px;
		}

		.input-field {
			width: calc(100% - 20px); /* Adjust width for mobile */
			padding: 10px;
			font-size: 14px;
		}

		.mdc-button {
			padding: 10px 0;
			font-size: 14px;
		}

		.confirmation {
			font-size: 14px;
		}
	}
</style>
