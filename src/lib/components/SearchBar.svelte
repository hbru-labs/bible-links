<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	export let searchTerm = '';
	export let autofocus = true;

	const dispatch = createEventDispatcher<{ keypress: void }>();

	let inputEl: HTMLInputElement | undefined;
	onMount(() => {
		autofocus && inputEl?.focus();
	});

	function handleKeyPress(ev: KeyboardEvent) {
		if (ev.key === 'Enter' && searchTerm) {
			dispatch('keypress');
		}
	}
</script>

<search-bar>
	<div
		class="flex h-10 w-[280px] sm:w-[320px] items-center space-x-2 rounded-md border-2 border-zinc-500 py-2 px-2.5 focus-within:border-indigo-600"
	>
		<div class="my-2 flex h-7 w-7 items-center justify-center">
			<svg
				fill="#000000"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 30 30"
				width="30px"
				height="30px"
				><path
					d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
				/></svg
			>
		</div>
		<input
			type="search"
			class="text-md block h-6 w-full border-none bg-transparent pl-0 outline-none focus:ring-0"
			placeholder="Start typing to search..."
			on:keypress={handleKeyPress}
			bind:value={searchTerm}
			bind:this={inputEl}
		/>
	</div>
</search-bar>

<style>
	input[type='search']::-webkit-search-cancel-button {
		display: none;
	}
</style>
