<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let searchTerm = '';
	const title = 'Bible Links';
	const imgSrc =
		'https://res.cloudinary.com/cpnwaugha/image/upload/v1649503686/bible-links/main_logo.png';
	const description =
		'Share beautiful Bible verses and chapters on Social Media with the goal of supporting communities to remain strong in Christ';

	function navigateToSearch() {
		goto('/search?q=' + encodeURIComponent(searchTerm));
	}
</script>

<svelte:head>
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
</svelte:head>

<div class="home h-screen">
	<div class="grid place-items-center p-2.5 text-center mx-auto my-0 gap-4">
		<div class="w-60 sm:w-full">
			<Logo size="large" />
		</div>

		<div class="flex justify-center mb-4 w-3/5">
			<div class="flex flex-col space-y-3 items-center max-w-[480px]">
				<div class="text-lg lowercase leading-4 mb-3 font-semibold">Search the Bible</div>
				<SearchBar bind:searchTerm on:keypress={navigateToSearch} />
				<div class="w-[140px]">
					<Button on:click={navigateToSearch} disabled={!searchTerm} />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.home {
		background: linear-gradient(120deg, rgba(240, 255, 255, 0.4) 40%, rgba(255, 255, 255, 1) 100%);
	}
</style>
