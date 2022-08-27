<script lang="ts">
	export let disabled: boolean = false;
	export let label: string;
	export let title: string = '';
	let _class = '';
	export { _class as class };
</script>

<button
	on:click
	{disabled}
	{title}
	class="inline-block w-full text-center px-4 py-2 border border-indigo-500 text-black bg-white hover:bg-zinc-50 transition-all ease-in-out rounded-md disabled:opacity-75 disabled:border-zinc-400 disabled:bg-zinc-50 {_class}"
>
	<slot>{label}</slot>
</button>
