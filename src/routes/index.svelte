<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';

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

	<div class="grid-x grid-margin-x">
		<div class="flex flex-col space-y-3 items-center">
			<Search bind:searchTerm />
			<div class="w-3/4">
				<Button on:click={search} disabled={!searchTerm} />
			</div>
		</div>

		<div class="mt-4 w-full h-20 border flex flex-wrap text-center">
			{#if searchResult.length}
				{#each searchResult as { _source }}
					<div class="w-full break-words">
						<span>{_source.text}</span>
					</div>
				{/each}
			{/if}
		</div>
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
		gap: 20px;
		padding: 10px;
	}

	div.footer {
		display: block;
		margin: 0 auto;
		max-width: 420px;
		width: auto;
		padding: 20px;
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
