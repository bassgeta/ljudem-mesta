<script lang="ts">
	import nalepka from '../lib/assets/nalepka.png';
</script>

<div class="nalepka">
	<img src="{nalepka}" alt="nalepka za ozavescanje" />
</div>

<style>
	.nalepka {
		animation: roottt 5s infinite forwards cubic-bezier(0.44, -0.31, 0.63, 1.23);
		animation-play-state: paused;
		&:hover {
			animation-play-state: running;
		}

		& img {
			width: min(30vw, 400px);
			height: min(30vw, 400px);
		}
	}
	@keyframes roottt {
		0% {
			transform: rotate(0) scale(0.93);
		}
		35% {
			transform: rotate(180deg) scale(0.93);
		}
		40% {
			transform: rotate(180deg) scale(0.93);
		}
		45% {
			transform: rotate(180deg) scale(1.2);
		}
		50% {
			transform: rotate(180deg) scale(0.93);
		}
		55% {
			transform: rotate(180deg) scale(1.2);
		}
		60% {
			transform: rotate(180deg) scale(0.93);
		}
		65% {
			transform: rotate(180deg) scale(0.93);
		}
		70% {
			transform: rotate(180deg) scale(0.93);
		}
		100% {
			transform: rotate(360deg) scale(0.93);
		}
	}
</style>
