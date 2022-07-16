<script lang="ts">
	import { TextToSpeechPlayCommand, type TextToSpeechLanguages } from '$lib/utils/constants';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import Spinner from './Spinner.svelte';
	import Snackbar from './Snackbar.svelte';

	export let text: string;
	export let lang: keyof typeof TextToSpeechLanguages;
	export let source: string = '';

	let loading = false;
	let errorMessage = '';

	$: if (lang) source = '';

	async function converTextToSpeech() {
		if (loading) return;
		loading = true;

		const URI = `${$page.url.origin}/api/text-to-speech`;
		await fetch(URI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text, lang })
		})
			.then((r) => {
				const json = r.json();
				if (r.ok) return json;

				throw json;
			})
			.then((r) => (source = r.data))
			.catch(async (e) => {
				const error = (await e).error;
				errorMessage =
					typeof error === 'string'
						? error
						: error?.message
						? error.message
						: 'Something went wrong';
			});

		loading = false;
	}
</script>

<text-to-speech>
	{#key lang}
		<div class="flex flex-col items-center">
			{#if source}
				<audio controls class="my-2" transition:fade|local>
					<source src={source} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			{:else}
				<button
					on:click={converTextToSpeech}
					class="hover:bg-zinc-100 px-4 py-3 my-2 rounded-full min-w-[280px] flex justify-center items-center"
					class:bg-zinc-100={loading}
					disabled={loading}
				>
					{#if loading}
						<Spinner />
					{:else}
						{TextToSpeechPlayCommand[lang]}
					{/if}
				</button>
			{/if}
		</div>
	{/key}
</text-to-speech>

<Snackbar
	text={errorMessage}
	show={!!errorMessage.length}
	on:dismissed={() => (errorMessage = '')}
/>
