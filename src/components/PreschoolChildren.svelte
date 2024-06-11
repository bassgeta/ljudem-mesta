<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { _ } from 'svelte-i18n';

	let chartValues = [12672, 12716, 12695, 12920, 12745, 12673, 12520, 12319, 11929, 11688, 11538];
	let chartLabels = [
		'2012',
		'2013',
		'2014',
		'2015',
		'2016',
		'2017',
		'2018',
		'2019',
		'2020',
		'2021',
		'2022'
	];
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
							display: true,
							drawOnChartArea: false
						},
						ticks: {
							color: blackColor,
							font: {
								family: 'Figtree',
								size: 14
							},
							padding: 8,
							callback: function (value) {
								return value;
							}
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: true,
						font: {
							family: 'Figtree',
							size: 14
						},
						color: blackColor,
						text: 'Število otrok vpisanih v vrtce v Ljubljani'
					}
				}
			},
			data: {
				labels: chartLabels,
				datasets: [
					{
						backgroundColor: [redColor],
						borderColor: [redColor],
						label: 'Število otrok',
						data: chartValues,
						pointRadius: 0,
						pointBackgroundColor: '#000',

						pointHitRadius: 10,
						pointHoverRadius: 10
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
		min-width: 0;
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
		padding: 0.5rem;
	}

	.canvas-container {
		width: 100%;
	}
</style>
