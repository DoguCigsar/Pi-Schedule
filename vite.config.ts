import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()] /*,
	esbuild: {
		drop: ['console', 'debugger'] // Removes all console.* and debugger statements for production safety
	}*/
});
