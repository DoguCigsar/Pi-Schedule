<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	let newPassword: string;
	let newUsername: string;
	let changePassword = async (password: string) => {
		const { data, error } = await supabase.auth.updateUser({
			password: password
		});
	};
	let setUsername = async (name: string) => {
		const { data, error } = await supabase.auth.updateUser({
			data: { name: name, user_name: name }
		});
	};
</script>

<div class="container">
	<h2 class="header">Profile</h2>
	<div class="content">
		<div class="profile-section">
			<h1 class="header">Change Password</h1>
			<input
				type="password"
				id="password"
				placeholder="New Password"
				bind:value={newPassword}
				class="input-field"
			/>
			<button class="mdc-button mdc-button--raised" on:click={() => changePassword(newPassword)}>
				<span class="mdc-button__label">Change Password</span>
			</button>
		</div>
		<div class="profile-section">
			<h1 class="header">Change Username</h1>
			<input
				type="text"
				id="username"
				placeholder="New Username"
				bind:value={newUsername}
				class="input-field"
			/>
			<button class="mdc-button mdc-button--raised" on:click={() => setUsername(newUsername)}>
				<span class="mdc-button__label">Change Username</span>
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
		padding: 16px;
		max-width: 100%;
		margin: 20px auto;
		background-color: #ffffff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}

	.header {
		font-size: 24px;
		font-weight: 500;
		color: #3f51b5;
		margin-bottom: 16px;
		text-align: center;
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
	}

	.profile-section {
		background-color: #f9f9f9;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
	}

	.input-field {
		width: 100%;
		padding: 12px;
		margin-bottom: 16px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 16px;
		box-sizing: border-box;
	}

	.mdc-button {
		width: 100%;
		background-color: #3f51b5;
		color: #ffffff;
		padding: 12px 0;
		font-size: 16px;
		border-radius: 4px;
		margin-top: 16px;
		box-sizing: border-box;
	}

	@media (min-width: 769px) {
		.container {
			padding: 24px;
			max-width: 800px;
		}
		.content {
			flex-direction: row;
		}
		.profile-section {
			padding: 20px;
		}
	}
</style>
