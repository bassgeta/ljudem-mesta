<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { _ } from 'svelte-i18n';

	let chartValues = [412, 403, 400, 420, 394, 383, 338, 356, 341, 338, 322];
	let chartLabels = ['2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];
	let ctx;
	let chartCanvas;

	onMount(() => {
		const style = getComputedStyle(document.body);
		const greenColor = style.getPropertyValue('--color-green');
		const redColor = style.getPropertyValue('--color-red');
		const blackColor = style.getPropertyValue('--color-black');

		ctx = chartCanvas.getContext('2d');

		new Chart(ctx, {
			type: 'line',
			
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
						offset: true,
						grid: {
							display: false,
							drawOnChartArea: false
						},
						ticks: {
							color: blackColor,
							font: {
								family: 'Figtree',
								size: 14
							},
							callback: function (value) {
								return value;
							}
						}
					},
	
				},
				plugins: {
					legend: {
						display: false,
			
					},
					title: {
                display: true,
                text: $_('schoolChildren.title')
            }
				}
			},
			data: {
				labels: chartLabels,
				datasets: [
					{
						backgroundColor: [redColor],
						label: 'Število otrok',
						data: chartValues
					}
				]
			}
		});
	});
</script>

<div class="chart-container-outer">
	<div class="chart-container-inner">
		<canvas class="canvas-container" bind:this="{chartCanvas}" id="schoolChildrenChart"></canvas>
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
