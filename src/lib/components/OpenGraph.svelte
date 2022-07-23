<script lang="ts">
	import { page } from '$app/stores';

	export let title = 'Bible Links';
	export let imgSrc =
		'https://res.cloudinary.com/cpnwaugha/image/upload/v1649503686/bible-links/main_logo.png';
	export let description =
		'Share beautiful Bible verses and chapters on Social Media with the goal of supporting communities to remain strong in Christ';
</script>

<svelte:head>
	<slot>
		<title>{title}</title>
		<meta name="description" content={description} />

		<meta name="og:title" content={title} />
		<meta name="og:description" content={description} />
		<meta name="og:site_name" content="Bible Links" />
		<meta name="og:type" content="website" />
		<meta name="og:url" content={$page.url.href} />

		<meta property="og:image" content={imgSrc} />
		<meta property="og:image:alt" content="${title}" />
		<meta property="og:image:width" content="720" />
		<meta property="og:image:height" content="540" />

		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta property="twitter:image" content={imgSrc} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:site" content="@ChukwumaNwaugha" />
	</slot>
</svelte:head>
