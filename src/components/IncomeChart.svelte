<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

	let chartValues = [1480, 1800, 2200, 2450];
	let chartLabels = ['Placa neto', 'AirBnB neto', 'Placa bruto', 'AirBnB bruto'];
	let ctx;
	let chartCanvas;

	onMount(() => {
		  ctx = chartCanvas.getContext('2d');

			new Chart(ctx, {
				type: 'bar',
				data: {
						labels: chartLabels,
						datasets: [{
                backgroundColor: ['green', 'red', 'green', 'red'],
								label: 'Placa',
								data: chartValues
						}]
				}
		});

	});

</script>

<canvas class="canvas-container" bind:this={chartCanvas} id="incomeChart"></canvas>

<style>
  .canvas-container {
    width: 100%;
  }
</style>
