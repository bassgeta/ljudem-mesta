<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let chartValues = [1480, 1800, 2200, 2450];
	let chartLabels = ['Neto Plača', 'AirBnB neto', 'Bruto plača', 'AirBnB bruto'];
	let ctx;
	let chartCanvas: HTMLCanvasElement;

	onMount(() => {
		const style = getComputedStyle(document.body);
		const blueColor = style.getPropertyValue('--color-blue');
		const redColor = style.getPropertyValue('--color-red');
		const blackColor = style.getPropertyValue('--color-black');

		ctx = chartCanvas.getContext('2d');

		new Chart(ctx!, {
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
						grid: {
							drawOnChartArea: false
						},
						ticks: {
							color: blackColor,
							font: {
								family: 'Figtree',
								size: 14
							},
							callback: function (value) {
								if (value === 0) return '0€';
								if (typeof value === 'string') return `${value}€`;
								return `${Math.round(value / 100) / 10}k`;
							}
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						caretSize: 0
					}
				}
			},
			data: {
				labels: chartLabels,
				datasets: [
					{
						backgroundColor: [blueColor, redColor, blueColor, redColor],
						label: 'Plača',
						data: chartValues,
						borderRadius: 20
					}
				]
			}
		});
	});
</script>

<div class="chart-content">
	<div class="chart-section">
		<div class="chart-container-outer">
			<div class="chart-container-inner">
				<canvas class="canvas-container" bind:this="{chartCanvas}" id="incomeChart"></canvas>
			</div>
		</div>
	</div>
	<div class="chart-description">
		{$_('incomeChart.description')}
		<sub>{$_('source')}</sub>
	</div>
</div>

<style>
	.chart-content {
		display: flex;
		background: var(--color-blue);
		border-radius: 25px;
		@media screen and (max-width: 900px) {
			flex-direction: column;
			& > .chart-description,
			& > .chart-section {
				flex: unset;
			}
		}
	}
	.chart-description {
		flex: 1;
		color: var(--color-black);
		padding: 32px;
		text-wrap: balance;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 16px;
		line-height: 1.5rem;
		& > sub {
			font-size: 0.8rem;
			font-style: italic;
		}
	}
	.chart-section {
		flex: 2;
		height: 60vh;
		/* max-width: 100%; */
		min-height: min(60vh, 500px);
		max-height: min(60vh, 500px);
		position: relative;
		min-width: 0;

		@media screen and (max-width: 767px) {
			height: 40vh;
			min-height: min(40vh, 500px);
			max-height: min(40vh, 500px);
		}
	}
	.chart-container-outer {
		min-width: 0;
		width: 100%;
		width: 100%;
		height: 100%;
		background-color: var(--color-white);
		border-radius: 25px;
		padding: 1rem;
		position: relative;
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
		@media screen and (max-width: 767px) {
			pointer-events: none;
		}
	}
</style>
