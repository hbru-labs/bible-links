<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url, params }) => {
		const meta = await fetch(`/data.json`, {
			method: 'POST',
			body: JSON.stringify({ pathname: params.path, query: url.search })
		}).then((r) => r.json());

		return { props: { meta }, stuff: { meta } };
	};
</script>

<script lang="ts">
	import type { JSON_DATA } from '$lib/types';

	export let meta: JSON_DATA;

	const title = `${meta.reference}: ${meta.translation_name}`;
	const imgSrc =
		'https://res.cloudinary.com/cpnwaugha/image/upload/v1649502780/bible-links/good_news_bible.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={meta.text} />

	<meta name="og:title" content={title} />
	<meta name="og:description" content={meta.text} />
	<meta name="og:site_name" content="Bible Links" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="https://bible-api.com" />

	<meta property="og:image" content={imgSrc} />
	<meta property="og:image:alt" content="${title}" />
	<meta property="og:image:width" content="720" />
	<meta property="og:image:height" content="540" />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={meta.text} />
	<meta property="twitter:image" content={imgSrc} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ChukwumaNwaugha" />
</svelte:head>

<slot />
