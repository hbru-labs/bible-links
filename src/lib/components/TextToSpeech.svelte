<script lang="ts">
	import type { TextToSpeechLanguages } from '$lib/utils/constants';
	import { fade } from 'svelte/transition';

	export let text: string;
	export let lang: keyof typeof TextToSpeechLanguages;

	let loading = false;
	let source: string = '';
	let fakeSource =
		'https://storage.googleapis.com/text-to-speech-x01/files/ee05285545e79e88d5859f3eb0c474ed.mp3?GoogleAccessId=translation%40bible-links-x01.iam.gserviceaccount.com&Expires=1658008258&Signature=xGE%2BCv9hnxQZeDjf2eB%2BZHMdYuuWHVdXH8Yf%2BX6CgHacxj45Cmszdo7O44l%2Byu8DwytL0YjGjw6NRWESEwfutwhfOHCtGxdupTUpgIMRHIh8kzlJyznSQrLcEN3cwg0Kq8Go8xNS8sIMu2Ow8rHFxygmmUTRYE%2FoTLM4hBrzNOfrGZ8p8up5Ms5c9EKQn7bZSt48K0xrJzAf0FsY5ACmnut%2FOD0HvixH0PMKFXbFgs8g20wDdOez%2BgWudLSt13RtA%2Fkk1Oj4cQepsM4Rawmk3HlD%2BmT0K%2BVZohZ88Jtr%2BgFk7sIy1Ehdb0nGb50PLeX%2FrFRIhzwOTuqjR8B2ULJ7EA%3D%3D';

	async function converTextToSpeech() {
		if (loading) return;
		loading = true;

		source = await new Promise((resolve) => setTimeout(() => resolve(fakeSource), 3000));
		loading = false;
	}
</script>

<text-to-speech>
	<div class="flex flex-col items-center">
		{#if source}
			<audio controls class="my-2" transition:fade|local>
				<source src={source} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		{:else}
			<button
				on:click={converTextToSpeech}
				class="hover:bg-zinc-200 px-4 py-2 my-3 rounded-md min-w-[280px]"
				class:bg-zinc-200={loading}
				disabled={loading}
			>
				{#if loading}
					Loading...
				{:else}
					Hear the text in your language
				{/if}
			</button>
		{/if}
	</div>
</text-to-speech>
