<script lang="ts">
	export let show: boolean = false;
	export let title: string;
	export function toggleModal() {
		show = !show;
	}

	let modalEl: HTMLDivElement;

	$: if (modalEl && show) {
		modalEl.style.display = 'block';
	} else if (modalEl) {
		modalEl.style.display = 'none';
	}

	function onclickWindow(event: Event) {
		if (event.target == modalEl) {
			show = false;
		}
	}
</script>

<svelte:window on:click={onclickWindow} />

<modal>
	<div
		bind:this={modalEl}
		class="hidden fixed z-[1] pt-20 left-0 top-0 h-full w-full overflow-auto bg-black bg-opacity-40"
	>
		<div
			on:click|stopPropagation
			class="modal-content relative m-auto p-0 border-1 border-solid bg-white border-zinc-400 w-2/3 sm:w-2/5 cursor-default"
		>
			<div class="py-0.5 h-10 px-4 text-black flex items-center relative">
				<slot name="header">
					<h2 class="font-bold">{title}</h2>
					<button
						on:click={() => (show = false)}
						class="close absolute right-3 text-[24px] font-bold text-black focus:cursor-pointer no-underline"
					>
						&times;
					</button>
				</slot>
			</div>
			<hr class="w-full" />
			<div class="py-2 px-4 h-auto relative w-full">
				<slot name="content">
					<p class="flex justify-center items-center flex-col">Modal content</p>
				</slot>
			</div>
			{#if $$slots.footer}
				<hr class="w-full" />
			{/if}
			<div class="py-2 px-4 relative">
				<slot name="footer" />
			</div>
		</div>
	</div>
</modal>

<style>
	.modal-content {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		-webkit-animation-name: animatetop;
		-webkit-animation-duration: 0.4s;
		animation-name: animatetop;
		animation-duration: 0.4s;
	}

	/* Add Animation */
	@-webkit-keyframes animatetop {
		from {
			top: -300px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}

	@keyframes animatetop {
		from {
			top: -300px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
</style>
