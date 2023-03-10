<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url, fetch }) => {
		const searchTerm = url.searchParams.get('q');
		let searchResultPromise: Promise<ESResponse[]> = Promise.resolve([]);
		let aiResultPromise: Promise<string> = Promise.resolve('');

		if (searchTerm) {
			searchResultPromise = fetch(`/api/search?q=${searchTerm}`, {
				method: 'POST'
			})
				.then((r) => r.json())
				.then((r) => JSON.parse(r.data));

			aiResultPromise = fetch(`/api/ask-the-bible`, {
				method: 'POST',
				body: JSON.stringify({
					query: searchTerm
				})
			})
				.then((r) => r.json())
				.then((r) => r.data);
		}

		return {
			props: {
				searchTerm,
				searchResultPromise,
				aiResultPromise
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
	import OpenGraph from '$lib/components/OpenGraph.svelte';
	import { fade } from 'svelte/transition';

	export let searchTerm = '';
	export let searchResultPromise: Promise<ESResponse[]>;
	export let aiResultPromise: Promise<string>;

	let loading = false;
	let searchResult: ESResponse[] = [];
	let aiResultLoading = false;
	let aiResult = '';

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

	$: if (aiResultPromise) {
		aiResultLoading = true;
		aiResultPromise.then((r) => (aiResult = r)).finally(() => (aiResultLoading = false));
	}

	function sanitizeAIResult(text: string) {
		// const sanitizedText = text.split('\n\nReferences');
		// let references = sanitizedText[1]?.replace(/\n/gm, ', ') || '';
		// if (references) {
		// 	references = references
		// 		.replace(/[\:\,]+/, '')
		// 		.split(', ')
		// 		.map((r) => `<span class="underline text-blue-600">${r.trim()}</span>`)
		// 		.join(' ');
		// }
		const explanation = text; // .replace(/\n/gm, ' ');
		return explanation;
	}
</script>

<OpenGraph />

<div class="grid place-items-center p-2.5 text-center mx-auto my-0 gap-1 pt-20 sm:pt-6">
	<div class="block mb-4">
		<div class="flex space-x-1 items-center">
			<SearchBar showIcon={false} bind:searchTerm on:keypress={navigateToSearch} />
			<div class="w-auto ml-1">
				<IconButton on:click={navigateToSearch} disabled={!searchTerm} />
			</div>
		</div>
	</div>

	<div class="max-w-[420px] h-[520px] w-full overflow-x-hidden overflow-y-auto">
		<div
			id="ai_result"
			class="relative w-full flex justify-center items-center min-h-52 rounded-md border-2 border-zinc-400 border-dashed"
			class:h-52={aiResultLoading}
		>
			{#if aiResultLoading}
				<Spinner />
			{:else if aiResult}
				<div
					in:fade|local
					class="h-full w-full text-zinc-900 antialiased text-left text-md p-2 pb-4"
				>
					<span class="inline-block">
						{@html sanitizeAIResult(aiResult)}
					</span>
				</div>
				<div class="absolute right-1 bottom-1 text-[10px] text-indigo-500">⚡ AI generated</div>
			{/if}
		</div>
		<div
			class="mt-4 mb-3 w-full flex px-2 flex-wrap space-y-2 text-center justify-center pb-2"
			class:hidden={!noDuplicateSearchResult.length || aiResultLoading}
		>
			<div class="w-full text-left text-md underline font-medium">Extra contexts:</div>
			{#each noDuplicateSearchResult as { _source, _id } (_id)}
				{@const translation = 'kjv'}
				<!-- _source.translation -->
				<ListItem
					text={_source.text}
					book_verse={_source.book_verse}
					{translation}
					query={searchTerm}
				/>
			{/each}
		</div>
	</div>
</div>
