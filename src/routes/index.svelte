<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	let searchTerm = '';

	let searchResult: any[] = [];

	async function search() {
		const response = await fetch(`/api/search?q=${searchTerm}`, {
			method: 'POST'
		}).then((r) => r.json());

		searchResult = JSON.parse(response.data);

		console.log({ searchResult });
	}
</script>

<div class="grid-container">
	<Logo size="medium" />

	<div class="block mb-4">
		<div class="flex flex-col space-y-3 items-center">
			<Search bind:searchTerm />
			<div class="w-3/4">
				<Button on:click={search} disabled={!searchTerm} />
			</div>
		</div>
	</div>

	<div class="max-w-[420px] h-[400px] w-full overflow-x-hidden overflow-y-auto">
		{#if searchResult.length}
			<div class="mt-4 mb-3 w-full flex px-2 flex-wrap space-y-2 text-center">
				{#each searchResult as { _source }}
					<ListItem
						text={_source.text}
						book_verse={_source.book_verse}
						translation={_source.translation}
					/>
				{/each}
			</div>
		{/if}
	</div>

	<div class="text footer">
		Powered by <a href="https://bible-api.com">https://bible-api.com</a>
	</div>
</div>

<style>
	.grid-container {
		margin: 0 auto;
		text-align: center;
		place-items: center;
		padding: 10px;
	}

	div.footer {
		display: block;
		margin: 0 auto;
		max-width: 420px;
		width: auto;
		padding: 10px;
		padding-bottom: 5px;
	}

	.footer {
		margin-top: 20px;
		text-align: left;
		font-size: 10px;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
