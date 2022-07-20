<script lang="ts">
	import { page } from '$app/stores';
	import type { TargetLanguageCodeType } from '$lib/utils/types';
	import { otherTranslations, seeOtherTranslationsLabel } from '$lib/utils/constants';

	export let currentTranslation: string;
	export let lang: TargetLanguageCodeType = 'en';

	$: translationsEntries = otherTranslations.filter(([key]) => key !== currentTranslation);

	function constructHref(tr: string) {
		let query = `translation=${tr}`;

		const language = $page.url.searchParams.get('language');
		const media = $page.url.searchParams.get('media');
		if (language) query += `&language=${language}`;
		if (media) query += `&media=${media}`;

		return `${$page.url.origin}/${$page.params.path}?${query}`;
	}
</script>

<other-translations class="block mt-5">
	{#key $page.url.search}
		<p class="mb-0.5 p-0 font-normal text-sm">{seeOtherTranslationsLabel[lang]}:</p>
		<div class="flex flex-wrap gap-[5px] text-[13px]">
			{#each translationsEntries as [tr, title] (tr)}
				{@const href = constructHref(tr)}

				<a {href} {title}>{tr};</a>
			{/each}
		</div>
	{/key}
</other-translations>

<style>
	a:link {
		color: blue;
		text-decoration: underline;
	}

	a:visited {
		color: indigo;
	}
</style>
