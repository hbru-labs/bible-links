<script lang="ts" context="module">
	const extractError = (errorData: any) => {
		const error = errorData?.error;

		return typeof error === 'string'
			? error
			: error?.message
			? error.message
			: Object.keys(error).length
			? JSON.stringify(error)
			: 'Something went wrong';
	};
</script>

<script lang="ts">
	import { TextToSpeechPlayCommand, type TextToSpeechLanguages } from '$lib/utils/constants';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import Spinner from './Spinner.svelte';
	import Snackbar from './Snackbar.svelte';
	import type { Media } from '$lib/utils/types';

	export let text: string;
	export let lang: keyof typeof TextToSpeechLanguages;
	export let source: string = '';
	export let media: Media;
	export let translation: string;

	let loading = false;
	let errorMessage = '';

	$: if (lang || translation) {
		source = '';
		if (media === 'audio') {
			loading = true;
		}
	}

	$: if (source && media === 'audio') {
		loading = false;
	}

	$: if (media === 'audio') {
		$page.stuff.audioSourcePromise
			.then((r) => (source = r))
			.catch(() => (source = ''))
			.finally(() => (loading = false));
	}

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
			.catch(async (err) => {
				errorMessage = extractError(await err);
			});

		loading = false;
	}
</script>

<text-to-speech>
	{#key lang || translation}
		<div class="flex flex-col items-center">
			{#if source}
				<audio controls class="my-2" in:fade|local>
					<source src={source} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			{:else}
				<button
					on:click={converTextToSpeech}
					class="hover:bg-zinc-100 px-4 py-3 my-2 rounded-full min-w-[280px] flex justify-center items-center"
					class:bg-zinc-100={loading || media === 'audio'}
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
