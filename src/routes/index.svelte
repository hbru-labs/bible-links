<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';

	let searchTerm = '';

	async function search() {
		console.log({ searchTerm });
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
	p {
		max-width: 420px;
		width: auto;
		border: 1px solid #ccc;
		padding: 16px;
		border-radius: 4px;
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
