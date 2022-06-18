<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	let searchTerm = '';
</script>

<div class="grid place-items-center p-2.5 text-center mx-auto my-0 gap-4">
	<Logo size="medium" />

	<div class="block mb-4">
		<div class="flex flex-col space-y-3 items-center">
			<Search bind:searchTerm />
			<div class="w-3/4">
				<Button
					on:click={() => goto('/search?q=' + encodeURIComponent(searchTerm))}
					disabled={!searchTerm}
				/>
			</div>
		</div>
	</div>
</div>
