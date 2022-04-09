<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="block-container">
	<div class="text-wrapper">
		<span class="text text-20">
			{$page.stuff.meta.text}
		</span>
	</div>

	<div>
		<img src="/images/good_news_bible.png" alt="Goodnews bible" />
	</div>
</div>

<style>
	.block-container > div {
		display: block;
		margin: 0 auto;
		max-width: 420px;
		width: auto;
		padding: 20px;
	}
	.text-wrapper {
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
