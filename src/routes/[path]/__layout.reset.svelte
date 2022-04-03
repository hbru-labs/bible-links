<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url, params }) => {
		const data = await fetch(`/data.json`, {
			method: 'POST',
			body: JSON.stringify({ pathname: params.path, query: url.search })
		}).then((r) => r.json());

		return { props: { data } };
	};
</script>

<script lang="ts">
	import type { JSON_DATA } from '../types';

	export let data: JSON_DATA;
</script>

<div>
	{JSON.stringify(data, null, 2)}
</div>

<slot />
