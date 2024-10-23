<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	let email: string;
	let user_name: string;
	let password: string;
	let signup = async (email: string, password: string, user_name: string) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						user_name: user_name
					}
				}
			});
			if (error) {
				console.error(error);
			} else {
				goto('/courses_setup');
			}
		} catch (err) {
			console.error('Unexpected error ', err);
		}
	};
</script>

<div class="container">
	<h1 class="header">Sign Up</h1>

	<div class="input-group">
		<label class="mdc-text-field mdc-text-field--outlined">
			<span class="mdc-floating-label">Email</span>
			<input type="email" bind:value={email} class="mdc-text-field__input" placeholder="Email" />
			<span class="mdc-notched-outline">
				<span class="mdc-notched-outline__leading"></span>
				<span class="mdc-notched-outline__notch"></span>
				<span class="mdc-notched-outline__trailing"></span>
			</span>
		</label>
	</div>

	<div class="input-group">
		<label class="mdc-text-field mdc-text-field--outlined">
			<span class="mdc-floating-label">Username</span>
			<input
				type="text"
				bind:value={user_name}
				class="mdc-text-field__input"
				placeholder="Username"
			/>
			<span class="mdc-notched-outline">
				<span class="mdc-notched-outline__leading"></span>
				<span class="mdc-notched-outline__notch"></span>
				<span class="mdc-notched-outline__trailing"></span>
			</span>
		</label>
	</div>

	<div class="input-group">
		<label class="mdc-text-field mdc-text-field--outlined">
			<span class="mdc-floating-label">Password</span>
			<input
				type="password"
				bind:value={password}
				class="mdc-text-field__input"
				placeholder="Password"
			/>
			<span class="mdc-notched-outline">
				<span class="mdc-notched-outline__leading"></span>
				<span class="mdc-notched-outline__notch"></span>
				<span class="mdc-notched-outline__trailing"></span>
			</span>
		</label>
	</div>

	<button class="mdc-button mdc-button--raised" on:click={() => signup(email, password, user_name)}>
		<span class="mdc-button__label">Sign Up</span>
	</button>
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

	.input-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 16px;
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
		margin-top: 16px;
	}

	@media (max-width: 768px) {
		.container {
			padding: 16px;
			margin: 20px auto;
		}
	}
</style>
