<script lang="ts">
	import { page } from '$app/stores';
	import Select from './Select.svelte';
	import OtherTranslations from './OtherTranslations.svelte';
	import truncate from '$lib/utils/truncate';
	import { TargetLanguageCode, type TargetLanguageCodeType } from '$lib/utils/types';
	import { updateQueryParams } from '$lib/utils/urlly';

	export let currentTranslation: string;
	export let currentLanguage: TargetLanguageCodeType;
	export let hideHeader = false;
	export let hideFooter = false;

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

<div class="border-container">
	{#if !hideHeader}
		<p class="font-bold underline mb-2 relative">
			{$page.stuff.meta.reference}:
			<span
				class="translation_name lowercase font-normal"
				title={$page.stuff.meta.translation_name}
			>
				{truncate($page.stuff.meta.translation_name, 22)}
			</span>

			<span class="absolute right-0">
				<Select options={translateOptions} on:change={onchange} value={currentLanguage}>
					<div slot="label" />
				</Select>
			</span>
		</p>
	{/if}

	<slot name="content-wrapper">
		<div class="max-h-[420px] overflow-x-hidden overflow-y-auto">
			<slot name="content">
				<div class="text-20 bible-text">
					{$page.stuff.meta.text}
				</div>
			</slot>
		</div>
	</slot>

	{#if !hideFooter}
		<OtherTranslations {currentTranslation} lang={currentLanguage} />
	{/if}
</div>

<style>
	.bible-text:first-letter {
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: bold;
	}

	.border-container {
		@apply block w-full p-5 rounded-lg mt-20 ring ring-zinc-200;
	}
</style>
