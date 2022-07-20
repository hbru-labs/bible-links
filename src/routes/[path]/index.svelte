<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

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
	import ContentRenderer from '$lib/components/ContentRenderer.svelte';
	import LanguageMedia from '$lib/components/LanguageMedia.svelte';

	export let currentTranslation: string;
	export let currentLanguage: TargetLanguageCodeType;
	export let media: Media;
</script>

<div class="block-container py-0">
	<div
		class="wrapper-container flex flex-col space-y-2 mx-auto max-w-[422px] w-auto px-1 max-h-[720px] pb-10 pt-8 overflow-x-hidden overflow-y-scroll"
	>
		<LanguageMedia {media} {currentLanguage} />
		<div class="flex flex-col space-y-10 w-full">
			{#if media === 'text' || media === 'both'}
				<ContentRenderer {currentLanguage} {currentTranslation} />
			{/if}

			{#if media === 'audio' || media === 'both'}
				<ContentRenderer
					{currentLanguage}
					{currentTranslation}
					hideHeader={media === 'both'}
					hideFooter={media === 'both'}
				>
					<div slot="content" class="block">
						{#if isTranslationLang(currentLanguage)}
							<TextToSpeech
								text={$page.stuff.meta.text}
								lang={currentLanguage}
								{media}
								translation={currentTranslation}
							/>
						{:else}
							<span
								class="flex justify-center items-center text-md font-semibold my-2 py-3 rounded-full bg-zinc-100"
							>
								Not currently supported
							</span>
						{/if}
					</div>
				</ContentRenderer>
			{/if}
		</div>
	</div>
</div>

<style>
	.wrapper-container::-webkit-scrollbar {
		display: none;
	}

	.wrapper-container {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
