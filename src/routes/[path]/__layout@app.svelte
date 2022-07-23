<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { JSON_DATA, Media } from '$lib/utils/types';
	import safeGetQS from '$lib/utils/safeGetParams';

	export const load: Load = async ({ fetch, url, params }) => {
		const language = safeGetQS(url.searchParams, 'language');
		const translation = safeGetQS(url.searchParams, 'translation');
		const media = safeGetQS(url.searchParams, 'media') as Media;

		const meta = await fetch(`/api/data.json`, {
			method: 'POST',
			body: JSON.stringify({ pathname: params.path, language, translation })
		}).then((r) => r.json());

		if (meta.error) {
			throw new Error(meta.error);
		}

		let audioSourcePromise = Promise.resolve('');

		if (media === 'audio' && meta.text) {
			audioSourcePromise = fetch(`${url.origin}/api/text-to-speech`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: meta.text, lang: language })
			})
				.then((r) => {
					const json = r.json();
					if (r.ok) return json;
					throw json;
				})
				.then((r) => r.data);
		}

		return {
			props: { meta, media },
			stuff: {
				meta,
				audioSourcePromise
			}
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';

	export let meta: JSON_DATA;
	export let media: Media;

	const title = `${meta.reference}: ${meta.translation_name}`;
	const imgSrc =
		'https://res.cloudinary.com/cpnwaugha/image/upload/v1649503686/bible-links/main_logo.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={meta.text} />

	<meta name="og:title" content={title} />
	<meta name="og:description" content={meta.text} />
	<meta name="og:site_name" content="Bible Links" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content={$page.url.href} />

	<meta property="og:image" content={imgSrc} />
	<meta property="og:image:alt" content="${title}" />
	<meta property="og:image:width" content="720" />
	<meta property="og:image:height" content="540" />

	{#if media === 'audio'}
		{#await $page.stuff.audioSourcePromise then audioSource}
			<meta property="og:audio" content={audioSource} />
			<meta property="og:audio:secure_url" content={audioSource} />
			<meta property="og:audio:type" content="audio/mpeg" />
		{/await}
	{/if}

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={meta.text} />
	<meta property="twitter:image" content={imgSrc} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ChukwumaNwaugha" />
</svelte:head>

<slot />
