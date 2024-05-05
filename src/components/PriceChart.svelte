<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount, tick } from 'svelte';
	import Chart from 'chart.js/auto';
	import { priceData } from '$lib/price_data';
	import { cleanENLocale } from '../utils/i18n';

	let chartValues = priceData.map((pd) => pd.y);
	let chartLabels = priceData.map((pd) => pd.x);

	const shortLabels = [
		'',
		...chartLabels.slice(1, chartLabels.length - 2).map((time) => {
			const [year, q] = time.split('Q');
			if (q === '1') return year;
			return `Q${q}`;
		}),
		'',
		''
	];

	let ctx;
	let chartCanvas: HTMLCanvasElement;

	onMount(() => {
		const style = getComputedStyle(document.body);
		const blueColor = style.getPropertyValue('--color-blue');
		const redColor = style.getPropertyValue('--color-red');
		const blackColor = style.getPropertyValue('--color-black');

		ctx = chartCanvas.getContext('2d');

		const chart = new Chart(ctx!, {
			type: 'line',
			options: {
				layout: {
					padding: {
						left: -14,
						right: 0,
						bottom: -15,
						top: 0
					}
				},
				maintainAspectRatio: false,
				scales: {
					x: {
						grid: {
							drawOnChartArea: false,
							display: false
						},
						ticks: {
							color: (ctx) => {
								return shortLabels[ctx.index].startsWith('Q') ? blackColor : 'white';
							},
							mirror: true,
							autoSkip: false,
							font: {
								family: 'Figtree',
								size: (ctx) => {
									return shortLabels[ctx.index].startsWith('Q') ? 8 : 8;
								},

								weight: (ctx) => {
									return shortLabels[ctx.index].startsWith('Q') ? 'normal' : 'bold';
								}
							},
							z: 1,
							maxRotation: -90,
							minRotation: -90,
							padding: 4,
							callback(tickValue, index, ticks) {
								return shortLabels[index];
							}
						}
					},
					y: {
						grid: {
							display: false,
							drawOnChartArea: false
						},
						ticks: {
							color: blackColor,
							mirror: true,
							font: {
								family: 'Figtree',
								size: 14
							},
							callback: function (value, index) {
								if (index === 0) return '';
								if (value === 0) return '0€';
								if (typeof value === 'string') return `${value}€`;
								return `${Math.round(value / 100) / 10}k`;
							},
							z: 1
						}
					}
					//yAxes: [{ticks: {mirror: true}}],
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						caretSize: 0,
						callbacks: {
							title: ([cena]) => chartLabels[cena.dataIndex].replace('Q', ' Q'),
							label: (cena) => `Cena m²: ${chartValues[cena.dataIndex].toFixed(2)} €`
						}
					}
				}
			},
			data: {
				// labels: chartLabels,
				xLabels: shortLabels,
				datasets: [
					{
						backgroundColor: [redColor],
						borderColor: [redColor],
						label: 'Cena m²',
						data: chartValues,
						fill: true,

						pointRadius: 0,
						pointBackgroundColor: '#000',

						pointHitRadius: 10,
						pointHoverRadius: 10

						// borderRadius: 20
					}
				]
			}
		});
	});
</script>

<div class="chart-content">
	<div class="chart-description">
		{$_('incomeChart.description')}
		<sub><a href="https://www.arvio.si/" target="_blank">{$_('source')}</a></sub>
	</div>
	<div class="chart-section">
		<div class="chart-container-outer">
			<div class="chart-container-inner">
				<canvas class="canvas-container" bind:this="{chartCanvas}" id="incomeChart"></canvas>
			</div>
		</div>
	</div>
</div>

<style>
	.chart-content {
		display: flex;
		background: var(--color-red);
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
			height: 45vh;
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
		overflow: hidden;
	}

	.canvas-container {
		transform-origin: center center;
		transform: translate(0px, 10px) scale(1.01);
		width: 100%;
		@media screen and (max-width: 767px) {
			/* pointer-events: none; */
		}
	}
</style>
