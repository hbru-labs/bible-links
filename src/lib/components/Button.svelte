<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	on:click
	{disabled}
	class="inline-block w-full text-center px-4 py-2 border border-indigo-500 text-black bg-white hover:bg-zinc-50 transition-all ease-in-out rounded-md disabled:opacity-75 disabled:border-zinc-400 disabled:bg-zinc-50"
>
	<slot>Search</slot>
</button>
