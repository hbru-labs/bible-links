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
</script>

<script lang="ts">
	import { page } from '$app/stores';

	export let currentTranslation: string;
	$: translationsEntries = otherTranslations.filter(([key]) => key !== currentTranslation);
</script>

<other-translations>
	<p>See other translations:</p>
	<div class="other-links">
		{#each translationsEntries as [tr, title] (tr)}
			{@const href = `${$page.url.origin}/${$page.params.path}?translation=${tr}`}
			<a {href} {title}>{tr};</a>
		{/each}
	</div>
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
