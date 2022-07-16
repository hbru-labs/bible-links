<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text: string;
	export let timeout: number = 5000;
	export let dismiss: 'click' | 'timeout' = 'timeout';
	export let show = false;

	const dispatch = createEventDispatcher<{ dismissed: void }>();

	$: if (show && dismiss === 'timeout') {
		setTimeout(() => {
			dispatch('dismissed');
			show = false;
		}, timeout);
	}
</script>

{#if show}
	<snackbar style="--timeout: {(timeout - 500) / 1000}s">
		<div id="snackbar" class:show>
			{text}
		</div>
	</snackbar>
{/if}

<style>
	#snackbar {
		visibility: hidden;
		min-width: 250px;
		background-color: #333;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 16px;
		position: fixed;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		bottom: 30px;
		font-size: 17px;
	}

	#snackbar.show {
		visibility: visible;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
		animation: fadein 0.5s, fadeout 0.5s var(--timeout, 2.5s);
	}

	@-webkit-keyframes fadein {
		from {
			bottom: 0;
			opacity: 0;
		}
		to {
			bottom: 30px;
			opacity: 1;
		}
	}

	@keyframes fadein {
		from {
			bottom: 0;
			opacity: 0;
		}
		to {
			bottom: 30px;
			opacity: 1;
		}
	}

	@-webkit-keyframes fadeout {
		from {
			bottom: 30px;
			opacity: 1;
		}
		to {
			bottom: 0;
			opacity: 0;
		}
	}

	@keyframes fadeout {
		from {
			bottom: 30px;
			opacity: 1;
		}
		to {
			bottom: 0;
			opacity: 0;
		}
	}
</style>
