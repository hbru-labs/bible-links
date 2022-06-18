<script lang="ts" context="module">
	export const imgSize = {
		small: 60,
		medium: 120,
		large: 240,
		xlarge: 480
	};
</script>

<script lang="ts">
	export let size: keyof typeof imgSize = 'large';
</script>

<div class="flex p-5 w-auto max-w-[420px] mx-auto my-0">
	<img
		width={imgSize[size]}
		src="logo.png"
		alt="Bible Links logo"
		class="rounded-lg object-cover my-0 mx-auto"
	/>
</div>
