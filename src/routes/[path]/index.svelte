<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { browser } from '$app/env';
	export const load: Load = async ({ url }) => {
		const translation = url.searchParams.get('translation');
		return {
			props: {
				currentTranslation: browser ? translation : ''
			}
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import OtherTranslations from '$lib/components/OtherTranslations.svelte';

	export let currentTranslation: string;
</script>

<div class="block-container py-0 px-2.5">
	<div class="block mx-auto max-w-[420px] w-auto p-5 rounded-lg mt-20 ring ring-zinc-200">
		<p class="font-bold underline mb-2">
			{$page.stuff.meta.reference}:
			<span class="translation_name lowercase font-normal">
				{$page.stuff.meta.translation_name}
			</span>
		</p>
		<div class="max-h-[420px] overflow-x-hidden overflow-y-auto">
			<div class="text-20 bible-text">
				{$page.stuff.meta.text}
			</div>
		</div>

		<OtherTranslations {currentTranslation} />
	</div>
</div>

<style>
	.bible-text:first-letter {
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: bold;
	}
</style>
