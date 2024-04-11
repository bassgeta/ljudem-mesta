<script lang="ts">
	import Cloud from '$lib/assets/icons/cloud.svelte';
</script>

<div class="header">
	<h1 class="title">Airbnb, pejt domov!</h1>
	<div class="cloud-container">
		<Cloud />
		<h2 class="cloud-text">Stanovanja za ljudi,<br />ne zaslužek.</h2>
	</div>
</div>

<style>
	.header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.5rem;
		padding-bottom: 10rem;

		background-image: url('$lib/assets/main.png');
		background-repeat: no-repeat;
		background-size: auto 70%;
		background-position: right bottom;
	}

	.title {
		flex: 1;
		font-weight: 600;
		color: var(--color-red);
		font-size: 8rem;
	}

	.cloud-container {
		position: relative;
		height: fit-content;
		width: fit-content;
	}

	.cloud-text {
		max-width: 80%;
		position: absolute;
		top: 30px;
		left: 20px;

		font-size: 2.25rem;
		line-height: 2.75rem;
		font-weight: 500;
		color: var(--color-black);
	}
</style>
