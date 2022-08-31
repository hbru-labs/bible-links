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

	const PROD_ENV = process.env.NODE_ENV === 'production';
</script>

<script lang="ts">
	import OtherTranslations from '$lib/components/OtherTranslations.svelte';
	import BookSearchModal from '$lib/components/BookSearchModal.svelte';

	export let message: string;
	export let currentTranslation: string;

	let modalEl: BookSearchModal;
</script>

<div class="root-error flex flex-col justify-center items-center p-5">
	<p class="font-bold" style="font-size: 16px;">
		Uh-Oh: something went wrong
		{#if !PROD_ENV}
			<span class="block font-normal text-sm">
				{message}
			</span>
		{/if}
	</p>
	<OtherTranslations {currentTranslation} />

	<div class="w-4/5 sm:w-2/5 pt-0 flex flex-col items-center" style="margin-top: 60px;">
		<hr class="w-full h-1 mb-2" />
		<div class="flex justify-center cursor-pointer p-3">
			<span class="text-sm text-indigo-500" on:click={() => modalEl.openModal()}
				>Search using book+chapter:verse</span
			>
		</div>
	</div>

	<BookSearchModal bind:this={modalEl} />
</div>
