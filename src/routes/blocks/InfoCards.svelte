<script lang="ts">
	import { _ } from 'svelte-i18n';
	import avto from '../../lib/assets/figure/Avto.png';
	import kockaFigura from '../../lib/assets/figure/KockaFigura.png';
	import hiskaGreen from '../../lib/assets/hiska_green.png';
	import hiskaRed from '../../lib/assets/hiska_red.png';
</script>

<div class="info-cards">
	<div class="info-card info-card-white span-2">
		<div class="info-card-body">
			<div class="info-chart info-chart-stonks">
				<p class="info-chart-title">{@html $_('landing.airbnbApartments.shortTerm')}</p>
				<div class="chart-measure">
					<span>1640</span>
					<div class="indicator">
						<img src="{hiskaRed}" />
					</div>
				</div>
				<p class="info-chart-caption">{@html $_('landing.airbnbApartments.titleAppendix')}</p>
			</div>
			<div class="info-chart info-chart-not-stonks chart-green">
				<p class="info-chart-title">{@html $_('landing.airbnbApartments.longTerm')}</p>
				<div class="chart-measure">
					<span>538</span>
					<div class="indicator">
						<img src="{hiskaGreen}" />
					</div>
				</div>
				<p class="info-chart-caption">{@html $_('landing.nepremicnine.title')}</p>
			</div>
			<sub>
				<a
					href="https://web.archive.org/web/20240404221249/https://www.nepremicnine.net/oglasi-oddaja/ljubljana-mesto/stanovanje/"
					target="_blank">
					Vir</a
				>,
				<a
					href="https://n1info.si/gospodarstvo/nepremicnine/slovenija-na-airbnb-v-kamniku-grad-v-ljubljani-stanovanje-za-2-000-evrov/"
					target="_blank">vir</a>
			</sub>
		</div>
	</div>

	<div class="info-card info-card-purple">
		<div class="info-card-body">
			<h2 class="info-card-title">33<span>&nbsp;%</span></h2>
			<div class="info-card-figure">
				<img src="{avto}" alt="Slika avta" />
			</div>
			<p class="info-card-title-appendix">nakupov nepremičnin je naložb</p>
			<p class="info-card-content">
				“Čeprav cene v nekaterih drugih državah padajo, pri nas vztrajno rastejo. Približno tretjina
				kupcev stanovanje kupi zgolj kot naložbo.”
			</p>
			<a
				class="info-source"
				target="_blank"
				href="https://www.delo.si/gospodarstvo/novice/cene-nepremicnin-v-sloveniji-gor-v-nemciji-mocno-dol/"
				>{$_('source')}</a>
		</div>
	</div>
	<div class="info-card info-card-lime">
		<div class="info-card-body">
			<h2 class="info-card-title">80<span>&nbsp;%</span></h2>
			<div class="info-card-figure">
				<img src="{kockaFigura}" alt="Slika kocke in figure" />
			</div>
			<p class="info-card-title-appendix">kupcev novogradnje ne živi v njej</p>
			<p class="info-card-content">
				“Nekaj manj kot polovica novozgrajenih stanovanj v mestnem središču je naložbenih, lastniki
				pa živijo le v vsakem petem. Naložbena stanovanja so večinoma v lasti podjetij. V celotni
				Ljubljani pa lastniki živijo v polovici vseh prodanih tržnih stanovanj v novogradnjah.”
			</p>
			<a
				class="info-source"
				target="_blank"
				href="https://www.ostro.si/si/zgodbe/prestolnica-nepremicninskih-nalozb">{$_('source')}</a>
		</div>
	</div>
</div>

<style>
	.info-cards {
		width: 100%;

		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem 2.625rem;

		@media screen and (max-width: 767px) {
			grid-template-columns: repeat(1, 1fr);
			align-items: center;
		}
	}

	.info-cards > .span-2 {
		grid-column: 1/3;

		@media screen and (max-width: 767px) {
			grid-column: unset;
		}
	}

	.info-card-title {
		font-size: clamp(var(--font-xxxl), 10vw, var(--font-xxxl));
		line-height: clamp(var(--lh-xxl), 10vw, var(--lh-xxxl));
		font-weight: bold;

		@media screen and (max-width: 950px) {
			& span {
				font-size: 3rem;
			}
		}
		@media screen and (min-width: 700px) {
			margin-bottom: 1.1rem;
		}
	}

	.info-card-figure {
		background: var(--contrast);
		border-radius: 50%;

		position: absolute;
		top: 4%;
		right: 0.5%;

		width: var(--s);
		height: var(--s);
		--s: calc(var(--size) * 0.13);
		@media screen and (max-width: 767px) {
			--s: min(calc(var(--size) * 0.3), 140px);
		}
		& img {
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) scale(1.1) rotate(-4deg);
		}
	}

	.info-card-title-appendix {
		font-size: var(--font-l);
		line-height: var(--lh-l);
		font-weight: bold;
	}

	.info-card-content {
		margin-top: 2rem;
		margin-bottom: 1.5rem;
		font-size: var(--font-m);
		line-height: var(--lh-m);
		text-wrap: balance;
	}

	.info-card-purple {
		background-color: var(--color-purple);
		--contrast: var(--color-lime);
		color: var(--color-white);
	}

	.info-card-white {
		background-color: white;
		--contrast: black;
		color: black;
	}

	.info-card-lime {
		background-color: var(--color-lime);
		--contrast: var(--color-purple);
		color: var(--text-secondary);
	}

	.info-card-green {
		background-color: var(--color-dark-green);
		color: var(--color-white);
	}

	.info-card-orange {
		background-color: var(--color-orange);
		color: var(--text-secondary);
	}

	.info-source {
		margin-top: auto;
		font-size: var(--font-s);
		line-height: var(--lh-s);
		font-style: italic;
	}

	.info-card {
		position: relative;
	}

	.info-chart-stonks {
		--w: min(90%, 80vw);
	}

	.info-chart-not-stonks {
		--w: min(47%, 60vw);
	}

	.info-chart {
		--color: var(--color-red);
		--sub: var(--color-pink);
		&.chart-green {
			--color: var(--color-green-vibe);
			--sub: var(--color-green-vibier);
		}
		width: 100%;
		margin-bottom: 2rem;
		& .info-chart-title {
			font-size: clamp(var(--font-m), 10vw, var(--font-l));
			padding-bottom: 1rem;
			font-weight: bold;
		}
		& .info-chart-caption {
			font-size: clamp(var(--font-xs), 10vw, var(--font-s));
			padding-top: 1rem;
			font-weight: bold;
		}
		& .chart-measure {
			position: relative;
			width: var(--w);
			border: 6px solid black;
			background: var(--color);
			animation: charter 1s ease-in alternate;
			& span {
				padding-left: 0.2rem;
				font-size: clamp(var(--font-xl), 10vw, var(--font-xxxl));
				line-height: clamp(var(--lh-xl), 10vw, var(--lh-xxl));
				font-weight: bold;
			}

			& .indicator {
				--siz: 9rem;
				will-change: width;
				@media screen and (max-width: 767px) {
					--siz: min(calc(var(--size) / 5.1), 7rem);
				}
				position: absolute;
				height: var(--siz);
				width: var(--siz);
				top: 50%;
				transform: translate(50%, -50%);
				right: 0;
				border: 4px solid black;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				background: var(--sub);
				& img {
					width: 75%;
					height: auto;
				}
			}
		}
	}
</style>
