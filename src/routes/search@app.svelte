<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url, fetch }) => {
		const searchTerm = url.searchParams.get('q');
		let searchResultPromise: Promise<ESResponse[]> = Promise.resolve([]);

		if (searchTerm) {
			searchResultPromise = fetch(`/api/search?q=${searchTerm}`, {
				method: 'POST'
			})
				.then((r) => r.json())
				.then((r) => JSON.parse(r.data));
		}

		return {
			props: {
				searchTerm,
				searchResultPromise
			}
		};
	};
</script>

<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import type { ESResponse } from '$lib/utils/types';
	import { goto } from '$app/navigation';
	import IconButton from '$lib/components/IconButton.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { page } from '$app/stores';

	export let searchTerm = '';
	export let searchResultPromise: Promise<ESResponse[]>;

	let loading = false;
	let searchResult: ESResponse[] = [];

	function navigateToSearch() {
		const query = $page.url.searchParams.get('q');
		if (query === searchTerm) return;

		loading = true;
		searchResult = [];
		goto('/search?q=' + encodeURIComponent(searchTerm));
	}

	$: if (searchResultPromise) {
		loading = true;
		searchResultPromise.then((r) => (searchResult = r)).finally(() => (loading = false));
	}

	$: noDuplicateSearchResult = Object.values(
		searchResult.reduce(
			(acc, doc) => ({ ...acc, [doc._source.book_verse]: doc }),
			{} as Record<string, ESResponse>
		)
	);
</script>

<div class="grid place-items-center p-2.5 text-center mx-auto my-0 gap-1 pt-20 sm:pt-6">
	<div class="block mb-4">
		<div class="flex space-x-1 items-center">
			<SearchBar showIcon={false} bind:searchTerm on:keypress={navigateToSearch} />
			<div class="w-auto ml-1">
				<IconButton on:click={navigateToSearch} disabled={!searchTerm} />
			</div>
		</div>
	</div>

	<div class="max-w-[420px] h-[480px] w-full overflow-x-hidden overflow-y-auto">
		<div class="mt-4 mb-3 w-full flex px-2 flex-wrap space-y-2 text-center justify-center">
			{#each noDuplicateSearchResult as { _source, _id } (_id)}
				{@const translation = 'kjv'}
				<!-- _source.translation -->
				<ListItem
					text={_source.text}
					book_verse={_source.book_verse}
					{translation}
					query={searchTerm}
				/>
			{:else}
				{#if loading}
					<Spinner />
				{:else}
					<div class="text-gray-600">
						No results found for "{searchTerm}"
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
