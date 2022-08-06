<script lang="ts">
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';

	export let aiSummarization = '';

	let summarizing = false;

	async function summarizeText() {
		if (aiSummarization) return (aiSummarization = '');
		if (summarizing) return;

		summarizing = true;
		const URI = `${$page.url.origin}/api/text-summarization`;

		const { data } = await fetch(URI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text: $page.stuff.meta.text })
		})
			.then((r) => {
				const json = r.json();
				if (r.ok) return json;
				throw json;
			})
			.catch(() => ({ data: '' }))
			.finally(() => {
				summarizing = false;
			});

		aiSummarization = data;
	}
</script>

<ai-summarization>
	<button
		class="flex justify-center items-center w-6 h-6 ring-1 ring-zinc-300 hover:ring-purple-500 rounded-sm px-1 transition-all duration-200 ease-in-out"
		title={aiSummarization ? 'Clear' : 'AI summarization'}
		on:click={summarizeText}
	>
		{#if aiSummarization}
			<span class="text-12"> ❌ </span>
		{:else if !summarizing}
			⚡
		{:else}
			<Spinner small />
		{/if}
	</button>
</ai-summarization>
