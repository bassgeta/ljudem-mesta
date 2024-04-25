<script lang="ts">
	import Cloud from '$lib/assets/icons/cloud.svelte';
</script>

<div class="header">
	<h1 class="title">Airbnb,<br /> pejt domov!</h1>
	<div class="cloud-container">
		<Cloud />
		<h2 class="cloud-text">Stanovanja za ljudi,<br />ne zaslužek.</h2>
	</div>
</div>

<style>
	.header {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		@media only screen and (max-width: 767px) {
			align-items: flex-start;
			min-height: 100vh;
			justify-content: flex-start;
			gap: 3rem
		}
		flex-wrap: wrap;
		gap: 1.5rem;
		padding-bottom: 10rem;
		padding-right: 32px;

		background-image: url('$lib/assets/main.png');
		background-repeat: no-repeat;
		/* background-size: auto 70%; */
		background-size: min(90vw, 600px);
		background-position: left bottom;

		@media only screen and (max-width: 767px) {
			background-position: right 60vh;
		}
	}

	.title {
		flex: 1;
		@media only screen and (max-width: 767px) {
			flex: unset;
		}
		font-weight: 600;
		color: var(--color-red);
		font-size: clamp(3rem, 20vw, 8rem);
		max-width: min(710px, 100%);
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
		font-size: clamp(1.5rem, 8vw, 2.25rem);
		line-height: 2.75rem;
		font-weight: 500;
		color: var(--color-black);
	}
</style>
