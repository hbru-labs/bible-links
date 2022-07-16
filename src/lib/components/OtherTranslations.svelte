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
		if (language) query += `&language=${language}`;

		return `${$page.url.origin}/${$page.params.path}?${query}`;
	}
</script>

<other-translations>
	{#key $page.url.search}
		<p>{seeOtherTranslationsLabel[lang]}:</p>
		<div class="other-links">
			{#each translationsEntries as [tr, title] (tr)}
				{@const href = constructHref(tr)}

				<a {href} {title}>{tr};</a>
			{/each}
		</div>
	{/key}
</other-translations>

<style>
	other-translations {
		display: block;
		margin-top: 20px;
	}
	other-translations p {
		margin-bottom: 2px;
		padding: 0;
		font-weight: 400;
		font-size: 14px;
	}
	.other-links {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		font-size: 13px;
	}

	a:link {
		color: blue;
		text-decoration: underline;
	}

	a:visited {
		color: indigo;
	}
</style>
