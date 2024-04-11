<script>
	import '../global.css';
</script>

<div class="page">
	<slot />
</div>

<style>
	.page {
		height: 100vh;
		max-height: 100vh;
		overflow-y: auto;
		background-color: var(--bg-low);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-x: hidden;
	}
</style>
