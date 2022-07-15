<script lang="ts">
	import type { TextToSpeechLanguages } from '$lib/utils/constants';

	export let text: string;
	export let lang: keyof typeof TextToSpeechLanguages;
</script>

<text-to-speech> Click to translate </text-to-speech>
