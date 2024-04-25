<script lang="ts">
	import { _ } from 'svelte-i18n';
	import avto from '../../lib/assets/figure/Avto.png';
	import kockaFigura from '../../lib/assets/figure/KockaFigura.png';
</script>

<div class="info-cards">
	<div class="info-card info-card-purple">
		<div class="info-card-body">
			<h2 class="info-card-title">
				{$_('landing.airbnbApartments.title', {
					values: {
						total: 1515
					}
				})}
			</h2>
			<p class="info-card-title-appendix">{$_('landing.airbnbApartments.titleAppendix')}</p>
			<p class="info-card-content">{$_('landing.airbnbApartments.content')}</p>
			<a
				class="info-source"
				target="_blank"
				href="https://podcrto.si/stanovanjska-problematika-kdo-si-lahko-privosci-lasten-dom-v-ljubljani/"
				>{$_('source')}</a>
		</div>
	</div>
	<div class="info-card info-card-lime">
		<div class="info-card-body">
			<h2 class="info-card-title">577</h2>
			<p class="info-card-title-appendix">trenutno aktivnih oglasov na Nepremicnine.net</p>
			<p class="info-card-content"></p>
			<a
				class="info-source"
				target="_blank"
				href="https://www.nepremicnine.net/oglasi-oddaja/ljubljana-mesto/stanovanje/"
				>{$_('source')}</a>
		</div>
	</div>
	<div class="info-card info-card-purple">
		<div class="info-card-body">
			<h2 class="info-card-title">33<span>%</span></h2>
			<div class="info-card-figure">
				<img src="{avto}" alt="Slika avta" />
			</div>
			<p class="info-card-title-appendix">nepremičnin je kupljenih kot naložba</p>
			<p class="info-card-content">
				Čeprav cene v nekaterih drugih državah padejo, pri nas vztrajno rasejo. Približno tretjina
				kupcev stanovanje kupi zgolj kot naložbo.
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
			<h2 class="info-card-title">20<span>%</span></h2>
			<div class="info-card-figure">
				<img src="{kockaFigura}" alt="Slika kocke in figure" />
			</div>
			<p class="info-card-title-appendix">kupcev novogradnje živi v njej</p>
			<p class="info-card-content">
				Nekaj manj kot polovica novozgrajenih stanovanj v mestnem središču je naložbenih, lastniki
				pa živijo le v vsakem petem. Naložbena stanovanja so večinoma v lasti podjetij. V celotni
				Ljubljani pa lastniki živijo v polovici vseh prodanih tržnih stanovanj v novogradnjah.
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
		gap: 2rem;

		@media screen and (max-width: 767px) {
			grid-template-columns: repeat(1, 1fr);
			align-items: center;
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
			margin-bottom: 1.5rem;
		}
	}

	.info-card-figure {
		background: var(--contrast);
		border-radius: 50%;

		position: absolute;
		top: 2%;
		right: 2%;

		width: var(--s);
		height: var(--s);
		--s: calc(var(--size) * 0.15);
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
</style>
