<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url, fetch }) => {
		const searchTerm = url.searchParams.get('q');
		let searchResult: ESResponse[] = [];

		if (searchTerm) {
			const response = await fetch(`/api/search?q=${searchTerm}`, {
				method: 'POST'
			}).then((r) => r.json());

			searchResult = JSON.parse(response.data);
		}

		return {
			props: {
				searchTerm,
				searchResult
			}
		};
	};
</script>

<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { ESResponse } from '$lib/utils/types';
	import { goto } from '$app/navigation';

	export let searchTerm = '';
	export let searchResult: ESResponse[];

	function navigateToSearch() {
		goto('/search?q=' + encodeURIComponent(searchTerm));
	}
</script>

<div class="grid place-items-center p-2.5 text-center mx-auto my-0 gap-1 pt-20 sm:pt-6">
	<div class="block mb-4">
		<div class="flex flex-col space-y-3 items-center">
			<SearchBar bind:searchTerm on:keypress={navigateToSearch} />
			<div class="w-[140px]">
				<Button on:click={navigateToSearch} disabled={!searchTerm} />
			</div>
		</div>
	</div>

	<div class="max-w-[420px] h-[480px] w-full overflow-x-hidden overflow-y-auto">
		<div class="mt-4 mb-3 w-full flex px-2 flex-wrap space-y-2 text-center justify-center">
			{#each searchResult as { _source }}
				<ListItem
					text={_source.text}
					book_verse={_source.book_verse}
					translation={_source.translation}
					query={searchTerm}
				/>
			{:else}
				<div class="text-gray-600">
					No results found for "{searchTerm}"
				</div>
			{/each}
		</div>
	</div>
</div>
