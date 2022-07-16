<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { updateQueryParams } from '$lib/utils/urlly';

	export const load: Load = async ({ url }) => {
		const translation = url.searchParams.get('translation');
		const language = url.searchParams.get('language');
		const media = url.searchParams.get('media');
		return {
			props: {
				currentTranslation: translation || '',
				currentLanguage: language || 'en',
				media: media || 'text'
			}
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { TargetLanguageCodeType, Media } from '$lib/utils/types';
	import TextToSpeech from '$lib/components/TextToSpeech.svelte';
	import { isTranslationLang } from '$lib/utils/typeGuards';
	import MediaRenderer from '$lib/components/MediaRenderer.svelte';

	export let currentTranslation: string;
	export let currentLanguage: TargetLanguageCodeType;
	export let media: Media;
</script>

<div class="block-container py-0">
	<div
		class="wrapper-container block mx-auto max-w-[422px] w-auto px-1 max-h-[720px] pb-10 overflow-x-hidden overflow-y-scroll"
	>
		{#if media === 'text' || media === 'both'}
			<MediaRenderer {currentLanguage} {currentTranslation} />
		{/if}

		{#if isTranslationLang(currentLanguage) && (media === 'audio' || media === 'both')}
			<MediaRenderer
				{currentLanguage}
				{currentTranslation}
				hideHeader={media === 'both'}
				hideFooter={media === 'both'}
			>
				<TextToSpeech slot="content" text={$page.stuff.meta.text} lang={currentLanguage} {media} />
			</MediaRenderer>
		{/if}
	</div>
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

	.wrapper-container::-webkit-scrollbar {
		display: none;
	}

	.wrapper-container {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
