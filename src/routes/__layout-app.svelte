<script>
	import Footer from '$lib/components/Footer.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { page } from '$app/stores';
</script>

<slot />

{#if $page.url.pathname !== '/'}
	<a class="block fixed top-0 left-0" href="/">
		<Logo size="small" />
	</a>
{/if}
<Footer />
