<script lang="ts">
	export let text: string;
	export let book_verse: string;
	export let translation: string;
	export let query: string;

	function truncate(text: string, length: number = 140) {
		return text.length > length ? text.slice(0, length) + '...' : text;
	}

	function highlightQuery(text: string) {
		return text.replace(new RegExp(query, 'gi'), `<span class="bg-yellow-200">${query}</span>`);
	}
</script>

<list-item
	class="relative flex flex-col justify-start max-w-60 w-full p-2 h-auto break-words ring-1 ring-zinc-400 hover:ring-indigo-400 transition-all ease-in-out rounded-md"
>
	<span class="absolute top-1 left-2 underline">
		{book_verse}
	</span>
	<span class="mt-5 text-left">{@html highlightQuery(truncate(text))}</span>
	<a
		class="absolute flex justify-center items-center bottom-1 right-1 w-4 h-4 cursor-pointer group"
		href="/{book_verse}?translation={translation}"
		target="_blank"
	>
		<svg
			class="group-hover:fill-indigo-800 group-hover:scale-125 transition-all ease-in-out"
			fill="#000000"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			width="48px"
			height="48px"
			><path
				d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z"
			/></svg
		>
	</a>
</list-item>
