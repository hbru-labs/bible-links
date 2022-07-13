<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { updateQueryParams } from '$lib/utils/urlly';

	export const load: Load = async ({ url }) => {
		const translation = url.searchParams.get('translation');
		const language = url.searchParams.get('language');
		return {
			props: {
				currentTranslation: translation || '',
				currentLanguage: language || 'en'
			}
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import OtherTranslations from '$lib/components/OtherTranslations.svelte';
	import Select from '$lib/components/Select.svelte';
	import { TargetLanguageCode, type TargetLanguageCodeType } from '$lib/utils/types';

	export let currentTranslation: string;
	export let currentLanguage: TargetLanguageCodeType;

	$: translateOptions = Object.keys(TargetLanguageCode).map((k) => ({
		id: k,
		label: TargetLanguageCode[k]
	}));

	function onchange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const value = target.value;

		updateQueryParams({ language: value });
	}
</script>

<div class="block-container py-0 px-2.5">
	<div class="block mx-auto max-w-[420px] w-auto p-5 rounded-lg mt-20 ring ring-zinc-200">
		<p class="font-bold underline mb-2 relative">
			{$page.stuff.meta.reference}:
			<span class="translation_name lowercase font-normal">
				{$page.stuff.meta.translation_name}
			</span>

			<span class="absolute right-0">
				<Select options={translateOptions} on:change={onchange} value={currentLanguage}>
					<div slot="label" />
				</Select>
			</span>
		</p>
		<div class="max-h-[420px] overflow-x-hidden overflow-y-auto">
			<div class="text-20 bible-text">
				{$page.stuff.meta.text}
			</div>
		</div>

		<OtherTranslations {currentTranslation} lang={currentLanguage} />
	</div>
</div>

<style>
	.bible-text:first-letter {
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: bold;
	}
</style>
