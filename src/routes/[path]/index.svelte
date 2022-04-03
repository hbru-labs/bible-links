<script lang="ts">
	import { page } from '$app/stores';
</script>

<div style="display: block; height: 100%; width: 100%">
	{JSON.stringify($page.stuff.meta.text, null, 2)}
	<!-- <p>
		<img src="/static/good_news_bible.png" alt="Goodnews bible" />
	</p> -->
</div>
