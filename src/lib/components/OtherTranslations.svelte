<script lang="ts" context="module">
	const otherTranslations = Object.entries({
		almeida: 'João Ferreira de Almeida',
		bbe: 'Bible in Basic English',
		kjv: 'King James Version',
		'oeb-us': 'Open English Bible (US Edition)',
		'oeb-cw': 'Open English Bible (Commonwealth Edition)',
		rccv: 'Romanian Corrected Cornilescu Version',
		web: 'World English Bible',
		webbe: 'World English Bible (British Edition)'
	});

	const seeOtherTranslationsLabel = {
		en: 'See other translations',
		es: 'Ver otras traducciones',
		fr: 'Voir les autres traductions',
		de: 'Siehe andere Übersetzungen',
		it: 'Vedi altre traduzioni',
		ja: 'その他の翻訳を見る',
		ko: '다른 번역을 보십시오',
		nl: 'Bekijk andere vertalingen',
		pt: 'Veja outras traduções',
		zh: '查看其他翻译',
		ru: 'Смотреть другие переводы',
		af: 'Sien ander vertalings',
		ig: 'Hụ ntụgharị asụsụ ndị ọzọ',
		yo: 'Wo awọn itumọ miiran',
		zu: 'Bona ezinye izinguqulo',
		ur: 'دیگر تراجم دیکھیں',
		he: 'ראה תרגומים אחרים',
		hi: 'अन्य अनुवाद देखें'
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { TargetLanguageCodeType } from '$lib/utils/types';

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
