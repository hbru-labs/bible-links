<script lang="ts" context="module">
	export interface SelectType {
		id: string;
		label: string;
	}
</script>

<script lang="ts">
	export let options: SelectType[];
	export let value: string;
</script>

<container class="inline-block">
	<slot name="label">
		<label for="select">Select:</label>
	</slot>
	<select name="select" on:change {value}>
		{#each options as option (option.id)}
			<option value={option.id}>{option.label}</option>
		{:else}
			<option value="empty">Empty</option>
		{/each}
	</select>
</container>
