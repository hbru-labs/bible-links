<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { browser } from '$app/env';
	export const load: Load = async ({ url }) => {
		const translation = url.searchParams.get('translation');
		return {
			props: {
				currentTranslation: browser ? translation : ''
			}
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import OtherTranslations from '$lib/components/OtherTranslations.svelte';

	export let currentTranslation: string;
</script>

<div class="block-container">
	<div class="image-wrapper">
		<img width="240" src="logo.png" alt="Bible Links logo" />
	</div>

	<div class="text-wrapper">
		<p class="text text-20 text-bold reference">
			{$page.stuff.meta.reference}:
			<span class="translation_name">
				{$page.stuff.meta.translation_name}
			</span>
		</p>
		<div class="text text-20 bible-text">
			{$page.stuff.meta.text}
		</div>
		<OtherTranslations {currentTranslation} />
	</div>

	<div class="text footer">
		Powered by <a href="https://bible-api.com">https://bible-api.com</a>
	</div>
</div>

<style>
	.block-container {
		padding: 0 10px;
	}
	.block-container > div {
		display: block;
		margin: 0 auto;
		max-width: 420px;
		width: auto;
		padding: 20px;
	}
	.image-wrapper {
		display: flex;
	}
	.image-wrapper img {
		object-fit: cover;
		border-radius: 8px;
		margin: 0 auto;
	}
	.text-wrapper {
		border: 1px solid #333;
		border-radius: 8px;
		margin-top: 40px;
	}

	.bible-text:first-letter {
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: bold;
	}

	.reference {
		text-decoration: underline;
		margin-bottom: 8px;
	}

	.reference .translation_name {
		font-weight: normal;
		text-transform: lowercase;
	}

	.footer {
		margin-top: 20px;
		text-align: left;
		font-size: 10px;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
