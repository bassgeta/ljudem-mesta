<script lang="ts">
	import Cloud from '$lib/assets/icons/cloud.svelte';
</script>

<div class="header">
	<div class="status">
		<div class="indicator"></div>
		&nbsp;Stran v izdelavi<span>⚒️</span>
	</div>
	<h1 class="title">Airbnb,<br /> pejt domov!</h1>
	<div class="cloud-container">
		<Cloud />
		<h2 class="cloud-text">Stanovanja za ljudi,<br />ne zaslužek.</h2>
	</div>
</div>

<style>
	.header {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		@media only screen and (max-width: 767px) {
			align-items: flex-start;
			min-height: 100vh;
			justify-content: flex-start;
			gap: 3rem;
		}
		flex-wrap: wrap;
		gap: 1.5rem;
		padding-bottom: 218px;
		padding-right: 32px;
		margin-top: 5.25rem;

		background-image: url('$lib/assets/main.png');
		background-repeat: no-repeat;
		/* background-size: auto 70%; */
		background-size: min(90vw, 888px);
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
		font-size: clamp(3rem, 20vw, 6.25rem);
		line-height: 1.08;
		max-width: min(710px, 100%);
	}

	.cloud-container {
		position: relative;
		height: fit-content;
		width: fit-content;
	}

	.cloud-text {
		width: 80%;
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);

		font-size: 2.25rem;
		font-size: clamp(1.5rem, 8vw, 2.25rem);
		line-height: 2.25rem;
		font-weight: 500;
		color: var(--color-black);
	}

	.status {
		user-select: none;
		& span {
			font-family: sans-serif;
		}
		position: absolute;
		bottom: 4rem;
		transform: rotate(2deg) translate(0px, 0px);
		right: 1rem;
		/* font-family: monospace; */
		padding: 0.2rem 1rem;
		border: 2px solid white;
		border-radius: 1rem;
		font-weight: bolder;
		filter: drop-shadow(3px 3px 0 var(--color-red));
		transform-origin: left center;
		transition:
			filter 0.3s,
			tansform 0.3s ease-in-out;
		&:hover {
			transform: rotate(2deg) translate(3px, 3px);
			filter: drop-shadow(0px 0px 0px var(--color-red));
		}

		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: white;
		color: black;

		& .indicator {
			display: none;
			--s: 6px;
			width: var(--s);
			height: var(--s);
			background: var(--color-red);
			border-radius: 50%;
			box-shadow: 0 0 5px var(--color-red);
		}
	}
</style>
