<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import OpenGraph from '$lib/components/OpenGraph.svelte';
	import BookSearchModal from '$lib/components/BookSearchModal.svelte';

	let searchTerm = '';
	let modalEl: BookSearchModal;

	function navigateToSearch() {
		goto('/search?q=' + encodeURIComponent(searchTerm));
	}
</script>

<OpenGraph />

<div class="home h-screen">
	<div class="grid place-items-center p-2.5 text-center mx-auto my-0 gap-4">
		<div class="w-60 sm:w-full">
			<Logo size="large" />
		</div>

		<div class="flex justify-center mb-4 w-3/5">
			<div class="flex flex-col space-y-3 items-center max-w-[480px]">
				<div class="text-lg lowercase leading-4 mb-3 font-semibold">Search the Bible</div>
				<SearchBar
					bind:searchTerm
					on:keypress={navigateToSearch}
					onclickPress={() => modalEl.openModal()}
				/>
				<div class="w-[140px]">
					<Button on:click={navigateToSearch} disabled={!searchTerm} />
				</div>
			</div>
		</div>
	</div>

	<BookSearchModal bind:this={modalEl} />
</div>

<style>
	.home {
		background: linear-gradient(120deg, rgba(240, 255, 255, 0.4) 40%, rgba(255, 255, 255, 1) 100%);
	}
</style>
