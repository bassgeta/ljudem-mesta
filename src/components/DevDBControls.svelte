<script lang="ts">
	import { onMount } from 'svelte';
	import {
		generateApartments,
		removeAppartments,
		subscribeToApartments,
		fetchTotalLocked
	} from '../utils/liberation';

	export const clearApartments = () => {};

	let totalLiberated = 0;

	onMount(async () => {
		const total = await fetchTotalLocked();
		totalLiberated = total ?? 0;
		subscribeToApartments(async () => {
			const total = await fetchTotalLocked();
			totalLiberated = total ?? 0;
		});
	});
</script>

<div class="controls">
	<button class="control-btn" on:click="{() => generateApartments()}"
		>Dodaj vrstico ({totalLiberated} na voljo)</button>
	<!-- <button
		class="control-btn"
		on:click="{() => {
			removeAppartments();
			clearApartments();
		}}">Clear</button> -->
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
