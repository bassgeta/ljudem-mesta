<script>
	import '../global.css';
</script>

<div class="page">
	<slot />
</div>

<style>
	.page {
		background-color: var(--bg-low);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-x: hidden;
		padding: 0 var(--hpadding);
	}
</style>
