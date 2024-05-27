<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onMount, tick } from 'svelte';
	import Chart from 'chart.js/auto';
	import { priceData } from '$lib/price_data';
	import { airbnbsData } from '$lib/airbnbs_data';
	import { cleanENLocale } from '../utils/i18n';

	let chartValues = priceData.map((pd) => pd.y);
	let chartLabels = priceData.map((pd) => pd.x);
	let countValues = [
		...new Array(chartValues.length - airbnbsData.length).fill(null),
		...airbnbsData.map((pd) => pd.y)
	];

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
								if (window.innerWidth < 700) {
									if (/Q[24]/.test(shortLabels[ctx.index])) return 'transparent';
								}
								return shortLabels[ctx.index].startsWith('Q') ? blackColor : redColor;
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
							padding: 6,
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
							padding: 8,
							callback: function (value, index) {
								if (index === 0) return '';
								return `${value} €`;
							},
							z: 1
						}
					},
					y1: {
						position: 'right',
						grid: {
							display: false,
							drawOnChartArea: false
						},
						min: 0,
						max: 4500,
						ticks: {
							color: blackColor,
							// mirror: true,
							font: {
								family: 'Figtree',
								size: 14
							},
							padding: 8,
							callback: function (value, index) {
								if (index === 0) return '';
								return `${value}`;
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
							title: ([cena]) => chartLabels[cena.dataIndex].replace('Q', ' Q')
							// label: (cena) => `Cena m²: ${chartValues[cena.dataIndex].toFixed(2)} €`
							// label: (...params) => (console.log({ params }), '')
						}
					}
				}
			},
			data: {
				// labels: chartLabels,
				xLabels: shortLabels,
				datasets: [
					{
						backgroundColor: ['black'],
						borderColor: ['black'],
						label: 'Aktivnih listingov',
						data: countValues,
						fill: false,

						pointRadius: 0,
						pointBackgroundColor: 'black',

						pointHitRadius: 10,
						pointHoverRadius: 10,

						yAxisID: 'y1'
					},
					{
						backgroundColor: [redColor],
						borderColor: [redColor],
						label: 'Cena m²',
						data: chartValues,

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
		<p>
			<a
				target="_blank"
				href="https://urbaniizziv.uirs.si/Portals/urbaniizziv/Clanki/2020/uizziv-31-20201-strokovna_07.pdf"
				>Raziskave</a>
			<a target="_blank" href="https://www.sciencedirect.com/science/article/pii/S0094119020300498"
				>kažejo</a
			>, da povečanje števila enot, ki se oddajajo na Airbnbju povzroči povečanje cen stanovanj in
			najemnin.
		</p>
		<sub><a href="https://www.arvio.si/" target="_blank">Vir: Arvio</a></sub>
	</div>
	<div class="chart-section">
		<div class="chart-container-outer">
			<div class="chart-container-inner">
				<canvas class="canvas-container" bind:this="{chartCanvas}" id="incomeChart"></canvas>
			</div>
			<div class="legend">
				<div class="legend-item">
					<span>
						<div class="circle red"></div>
					</span>
					<span class="desc">Cena m2 v Ljubljani</span>
				</div>
				<div class="legend-item reverse">
					<span class="desc">Število aktivnih Airbnb oglasov v Ljubljani</span>
					<span>
						<div class="circle black"></div>
					</span>
				</div>
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
		height: 50vh;
		/* max-width: 100%; */
		min-height: min(50vh, 500px);
		max-height: min(50vh, 500px);
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

		display: flex;
		flex-direction: column;
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
		transform: translate(0px, 10px) scale(1.025);
		width: 100%;
		@media screen and (max-width: 767px) {
			/* pointer-events: none; */
		}
	}

	.legend {
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		@media screen and (max-width: 767px) {
			flex-direction: column;
			align-items: flex-start;
		}

		& .legend-item {
			flex-shrink: 0;
			display: flex;
			gap: 0.5rem;
			@media screen and (max-width: 767px) {
				&.reverse {
					flex-direction: row-reverse;
				}
			}
			& .circle {
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
				background: var(--color-black);
				&.red {
					background: var(--color-red);
				}
			}
			& .desc {
			}
		}
	}
</style>
