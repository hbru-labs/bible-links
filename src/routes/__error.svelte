<script lang="ts" context="module">
	import type { HandleError } from '@sveltejs/kit';
	import { browser } from '$app/env';

	export const load: HandleError = async ({ error }) => {
		let currentTranslation = '';
		if (browser) {
			currentTranslation = new URLSearchParams(window.location.search).get('translation');
		}
		return {
			props: { message: error.message, currentTranslation }
		};
	};
</script>

<script lang="ts">
	import OtherTranslations from '$lib/components/OtherTranslations.svelte';

	export let message: string;
	export let currentTranslation: string;
</script>

<div class="root-error">
	<p>Uh-Oh: {message}</p>
	<OtherTranslations {currentTranslation} />
</div>

<style>
	.root-error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}
	.root-error p {
		font-size: 16px;
		font-weight: bold;
	}
</style>
