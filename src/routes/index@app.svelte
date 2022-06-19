<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	let searchTerm = '';

	function navigateToSearch() {
		goto('/search?q=' + encodeURIComponent(searchTerm));
	}
</script>

<div class="grid place-items-center p-2.5 text-center mx-auto my-0 gap-4">
	<div class="w-60 sm:w-full">
		<Logo size="large" />
	</div>

	<div class="flex justify-center mb-4 w-3/5">
		<div class="flex flex-col space-y-3 items-center max-w-[480px]">
			<SearchBar bind:searchTerm on:keypress={navigateToSearch} />
			<div class="w-[140px]">
				<Button on:click={navigateToSearch} disabled={!searchTerm} />
			</div>
		</div>
	</div>
</div>
