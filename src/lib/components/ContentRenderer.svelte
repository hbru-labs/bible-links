<script lang="ts">
	import { page } from '$app/stores';
	import OtherTranslations from './OtherTranslations.svelte';
	import truncate from '$lib/utils/truncate';
	import type { TargetLanguageCodeType } from '$lib/utils/types';
	import sanitizeText from '$lib/utils/sanitizeText';

	export let currentTranslation: string;
	export let currentLanguage: TargetLanguageCodeType;
	export let hideHeader = false;
	export let hideFooter = false;
	export let aiSummarization = '';
</script>

<content-renderer>
	<div class="border-container relative">
		{#if !hideHeader}
			<p class="font-bold underline mb-2 relative">
				{$page.stuff.meta.reference}:
				<span
					class="translation_name lowercase font-normal"
					title={$page.stuff.meta.translation_name}
				>
					{truncate($page.stuff.meta.translation_name, 22)}
				</span>
			</p>
		{/if}

		<slot name="content-wrapper">
			<div class="max-h-[420px] overflow-x-hidden overflow-y-auto">
				<slot name="content">
					<div class="text-20 bible-text" style="white-space: pre-line">
						{#if aiSummarization}
							<span class="text-16" title="AI summarization">⚡</span>{aiSummarization}
						{:else}
							{sanitizeText($page.stuff.meta.text, $page.stuff.meta.translation_id)}
						{/if}
					</div>
				</slot>
			</div>
		</slot>

		{#if !hideFooter}
			<OtherTranslations {currentTranslation} lang={currentLanguage} />
		{/if}
	</div>
</content-renderer>

<style>
	.bible-text:first-letter {
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: bold;
	}

	.border-container {
		@apply block w-full p-5 rounded-lg ring ring-zinc-200;
	}
</style>
