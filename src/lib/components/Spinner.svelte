<script>
	export let small = true;
</script>

<spinner>
	<div class="loader" class:small />
</spinner>

<style>
	.loader {
		border: 4px solid #f3f3f3;
		border-radius: 50%;
		border-top: 4px solid #3498db;
		width: 24px;
		height: 24px;
		-webkit-animation: spin 1s linear infinite; /* Safari */
		animation: spin 1s linear infinite;
	}

	.loader.small {
		border-width: 2px;
		width: 16px;
		height: 16px;
		border-top-width: 2px;
	}

	/* Safari */
	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
