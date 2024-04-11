<script lang="ts">
	export const clearApartments = () => {};
	import { generateApartments, removeAppartments } from '../utils/liberation';
</script>

<div class="controls">
	<button class="control-btn" on:click="{() => generateApartments()}">Generate</button>
	<button
		class="control-btn"
		on:click="{() => {
			removeAppartments();
			clearApartments();
		}}">Clear</button>
</div>

<style>
	.control-btn {
		background-color: darksalmon;
	}

	.controls {
		padding: 40px;
		background-color: black;
	}
</style>
