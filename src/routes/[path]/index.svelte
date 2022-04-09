<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="block-container">
	<div class="image-wrapper">
		<img width="240" src="logo.png" alt="Goodnews Bible" />
	</div>

	<div class="text-wrapper">
		<p class="text text-20 text-bold reference">
			{$page.stuff.meta.reference}
		</p>
		<span class="text text-20">
			{$page.stuff.meta.text}
		</span>

		<p class="text footer">
			Powered by <a href="https://bible-api.com">https://bible-api.com</a>
		</p>
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

	.reference {
		text-decoration: underline;
		margin-bottom: 8px;
	}

	.footer {
		margin-top: 20px;
		text-align: left;
		font-size: 10px;
	}
</style>
