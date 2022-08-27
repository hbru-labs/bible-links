<script lang="ts">
	import IconButton from './IconButton.svelte';
	import Modal from './Modal.svelte';
	import SearchBar from './SearchBar.svelte';

	let modalEl: Modal;
	let searchTerm = '';
	function openDialog() {
		modalEl.toggleModal();
	}

	function handleSearch() {}
</script>

<book-search>
	<div
		on:click={openDialog}
		title="tap to open search dialog"
		class="flex justify-center items-center w-6 h-6 ring-1 ring-zinc-300 hover:ring-purple-500 rounded-sm px-1 transition-all duration-200 ease-in-out cursor-pointer"
	>
		<div class="my-2 flex h-7 w-7 items-center justify-center">
			<svg
				fill="#000000"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 30 30"
				width="30px"
				height="30px"
				><path
					d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
				/></svg
			>
		</div>

		<Modal bind:this={modalEl} title="Search by Book+Chapter:Verse">
			<div slot="content">
				<div class="flex justify-center items-center">
					<SearchBar showIcon={false} bind:searchTerm placeholder="john3:16" />
					<div class="w-auto ml-1">
						<IconButton on:click={handleSearch} disabled={!searchTerm} />
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
	</div>
</book-search>

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
