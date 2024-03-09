<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let chartValues = [1480, 1800, 2200, 2450];
	let chartLabels = ['Plača neto', 'AirBnB neto', 'Plača bruto', 'AirBnB bruto'];
	let ctx;
	let chartCanvas;

	onMount(() => {
		const style = getComputedStyle(document.body);
		const greenColor = style.getPropertyValue('--color-green');
		const redColor = style.getPropertyValue('--color-red');
		const blackColor = style.getPropertyValue('--color-black');

		ctx = chartCanvas.getContext('2d');

		new Chart(ctx, {
			type: 'bar',
			options: {
				maintainAspectRatio: false,
				scales: {
					x: {
						grid: {
							drawOnChartArea: false
						},
						ticks: {
							color: blackColor,
							font: {
								family: 'Figtree',
								size: 14
							}
						}
					},
					y: {
						ticks: {
							color: blackColor,
							font: {
								family: 'Figtree',
								size: 14
							},
							callback: function (value) {
								return value + '€';
							}
						}
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			},
			data: {
				labels: chartLabels,
				datasets: [
					{
						backgroundColor: [greenColor, redColor, greenColor, redColor],
						label: 'Plača',
						data: chartValues
					}
				]
			}
		});
	});
</script>

<div class="chart-container-outer">
	<div class="chart-container-inner">
		<canvas class="canvas-container" bind:this="{chartCanvas}" id="incomeChart"></canvas>
	</div>
</div>

<style>
	.chart-container-outer {
		width: 100%;
		height: 100%;
		background-color: var(--color-white);
		border-radius: 25px;
		padding: 1rem;
	}

	.chart-container-inner {
		height: 100%;
		display: flex;
		justify-content: center;

		border-radius: 11px;
		border: 2px solid var(--color-black);
		padding: 1.5rem;
	}

	.canvas-container {
		width: 100%;
	}
</style>
