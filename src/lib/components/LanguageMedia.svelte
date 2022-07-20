<script lang="ts">
	import { TargetLanguageCode, type Media, type TargetLanguageCodeType } from '$lib/utils/types';
	import { updateQueryParams } from '$lib/utils/urlly';
	import Select from './Select.svelte';

	export let currentLanguage: TargetLanguageCodeType;
	export let media: Media;

	function onchangeLanguage(e: Event) {
		const target = e.target as HTMLSelectElement;
		const value = target.value;

		updateQueryParams({ language: value });
	}

	function onchangeMedia(e: Event) {
		const target = e.target as HTMLSelectElement;
		const value = target.value;

		updateQueryParams({ media: value });
	}

	$: translateOptions = Object.keys(TargetLanguageCode).map((k) => ({
		id: k,
		label: TargetLanguageCode[k]
	}));

	$: mediaOptions = ['text', 'audio', 'both'].map((o) => ({ id: o, label: o }));
</script>

<language-media>
	<div class="block w-full p-2">
		<div class="flex justify-end items-center space-x-5 font-bold">
			<Select options={translateOptions} on:change={onchangeLanguage} value={currentLanguage}>
				<div slot="label" />
			</Select>
			<Select options={mediaOptions} on:change={onchangeMedia} value={media}>
				<div slot="label" />
			</Select>
		</div>
	</div>
</language-media>
