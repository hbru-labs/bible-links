<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import IconButton from './IconButton.svelte';
	import Modal from './Modal.svelte';
	import SearchBar from './SearchBar.svelte';

	export function openModal() {
		modalEl.toggleModal();
	}

	const dispatch = createEventDispatcher<{ search: void }>();

	let modalEl: Modal;
	let searchTerm = '';
	let navigating = false;

	async function handleSearch() {
		dispatch('search');

		navigating = true;
		await goto(`/${searchTerm.toLowerCase()}`);

		navigating = false;
		modalEl.toggleModal();
		searchTerm = '';
	}
</script>

<Modal bind:this={modalEl} title="Search by Book+Chapter:Verse">
	<div slot="content">
		<div class="flex justify-center items-center">
			<SearchBar showIcon={false} bind:searchTerm placeholder="john3:16" disabled={navigating} />
			<div class="w-auto ml-1">
				<IconButton
					on:click={handleSearch}
					disabled={!searchTerm || navigating}
					loading={navigating}
				/>
			</div>
		</div>

		<div class="mt-10">
			<h3 class="font-semibold underline">examples:</h3>
			<ul>
				<li>single verse: <em>john3:16</em></li>
				<li>abbreviated book name: <em>jn3:16</em></li>
				<li>verse range: <em>romans12:1-2</em></li>
				<li>multiple ranges: <em>romans12:1-2,5-7,9,13:1-9&10</em></li>
				<li>different translation: <em>john3:16?translation=kjv</em></li>
			</ul>
		</div>
	</div>
</Modal>

<style>
	ul {
		display: block;
		list-style-type: disc;
		margin-bottom: 0.5rem;
		padding-left: 20px;
	}
	ul li {
		margin-bottom: 0.1rem;
		font-size: 0.8rem;
	}
</style>
