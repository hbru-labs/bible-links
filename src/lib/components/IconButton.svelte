<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let disabled: boolean = false;
	export let loading: boolean = false;
</script>

<button
	on:click
	{disabled}
	class="inline-block w-auto p-2 border border-indigo-500 text-black bg-white hover:bg-zinc-50 transition-all ease-in-out rounded-md disabled:opacity-75 disabled:border-zinc-400 disabled:bg-zinc-50"
>
	<div class="flex h-6 w-6 items-center justify-center">
		<slot name="icon-svg">
			{#if loading}
				<Spinner />
			{:else}
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
			{/if}
		</slot>
	</div>
</button>
