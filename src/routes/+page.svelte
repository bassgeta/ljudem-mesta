<script lang="ts">
	import '../supress-console';
	import { _ } from 'svelte-i18n';
	import IncomeChart from '../components/IncomeChart.svelte';
	import CurrentRestrictionsMap from '../components/CurrentRestrictionsMap.svelte';
	import ComparisonTable from '../components/ComparisonTable.svelte';
	import HotelNumbers from '../components/HotelNumbers.svelte';
	import Testimonials from '../components/Testimonials/Testimonials.svelte';
	import Liberate from '../components/Liberate.svelte';
	import TestimonialsContact from '../components/TestimonialsContact.svelte';
	import Header from './blocks/Header.svelte';
	import InfoCards from './blocks/InfoCards.svelte';
	import { browser, dev } from '$app/environment';
	import PriceChart from '../components/PriceChart.svelte';
	import Stalisce from '$lib/assets/icons/stalisce.svelte';
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<title>{$_('landing.head.title')}</title>

	<!-- Primary Meta Tags -->
	<meta name="title" content="{$_('landing.head.title')}" />
	<meta name="description" content="{$_('landing.head.description')}" />
	<meta name="keywords" content="{$_('landing.head.keywords')}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://airbnbpejtdomov.si/" />
	<meta property="og:title" content="{$_('landing.head.title')}" />
	<meta property="og:description" content="{$_('landing.head.description')}" />
	<meta property="og:image" content="https://airbnbpejtdomov.si/airbnb-og.jpg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://airbnbpejtdomov.si/" />
	<meta property="twitter:title" content="{$_('landing.head.title')}" />
	<meta property="twitter:description" content="{$_('landing.head.description')}" />
	<meta property="twitter:image" content="https://airbnbpejtdomov.si/airbnb-og.jpg" />

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

<div class="landing">
	<Header />
	<p class="top-header">{$_('landing.topHeader')}</p>
	<div class="landing-section">
		<InfoCards />
	</div>
	<!-- <h2 class="section-title salary-title comparison-title">
		{$_('landing.salary.title')}
	</h2> -->
	<h2 class="section-title salary-title comparison-title">
		Cene stanovanj v Ljubljani so se v zadnjem desetletju podvojile, število oglaševanih Airbnb
		stanovanj pa se je samo v zadnjih treh letih skoraj potrojilo.
	</h2>
	<div class="landing-section chart-container">
		<PriceChart />
	</div>
	<h2 class="section-title">
		{$_('landing.comparison.title')}
	</h2>
	<div class="landing-section chart-container">
		<IncomeChart />
	</div>
	<h2 class="section-title comparison-title">
		{$_('landing.comparison.title3')}
	</h2>
	<p class="section-subtitle comparison-subtitle">
		{$_('landing.comparison.subtitle')}
		<a
			href="https://www.mladina.si/229092/airbnb-nepremicninski-divji-zahod/"
			target="_blank"
			class="source">Vir: Mladina</a>
	</p>
	<div class="landing-section">
		<ComparisonTable />
	</div>
	<div class="landing-section hotel-section">
		<HotelNumbers />
	</div>
	<h2 class="section-title testimonials-title">
		{$_('landing.testimonials.title')}
	</h2>
	<div class="landing-section testimonials-section">
		<Testimonials />
		<TestimonialsContact />
	</div>
	<h2 class="section-title map-title">
		{$_('landing.map.title')}
	</h2>
	<p class="section-subtitle map-subtitle">
		{$_('landing.map.subtitle')}
	</p>
	<div class="map-section landing-section">
		<CurrentRestrictionsMap />
	</div>
	<h2 class="section-title">Kaj pa Slovenija?</h2>
	<div class="what-about">
		<p class="section-subtitle">
			13. maja 2024 je Ministrstvo za gospodarstvo, turizem in šport v javno obravnavo končno
			poslalo <a
				href="https://www.gov.si/novice/2024-05-13-zacetek-javne-obravnave-novega-zakona-o-gostinstvu/"
				target="_blank">Zakon o gostinstvu</a
			>, ki prinaša določene omejitve glede kratkotrajnega oddajanja.
		</p>
		<p class="section-subtitle">
			Zakon je korak v pravo smer, vendar opozarjamo na nekaj pomankljivosti, ki bi lahko zmanjšale
			njegov učinek.
		</p>
		<p class="section-subtitle">
			Zavzeti se moramo za čim strožjo verzijo, ki ne bo dopuščala izigravanja.
		</p>
		<p class="section-subtitle">
			Preberi naše stališče na predlog zakona in tudi ti sodeluj v javni razpravi!
		</p>
	</div>
	<a href="/stalisce" class="shadowed-card shadowed-button stalisce-btn">
		<div class="circle">
			<div class="stalisce-icon">
				<Stalisce />
			</div>
		</div>
		<span>Naše stališče</span>
		<Arrow />
	</a>
</div>
<div class="liberate-section">
	<div class="liberate-container">
		<Liberate />
	</div>
</div>
<Footer />

{#if browser && !dev}
	<script
		defer
		data-domain="airbnbpejtdomov.si"
		src="https://plausible.lb.djnd.si/js/plausible.js"></script>
{/if}

<style>
	.landing {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.top-header {
		max-width: 700px;
		font-size: 2.25rem;
		line-height: 2.875rem;
		font-weight: 500;
		margin: 7rem 0;
		text-align: center;
		text-wrap: balance;
	}

	.banner {
		width: 100%;
	}

	.landing-section {
		width: 100%;
		padding: 0 1.5rem;
	}

	@media screen and (max-width: 767px) {
		.landing-section {
			width: 100%;
			padding: 0 0.5rem;
		}
	}

	.section-title {
		font-size: var(--font-xl);
		line-height: var(--lh-xl);
		font-weight: 700;
		padding: 0 1.5rem;
		text-align: center;

		margin-top: 7rem;
		margin-bottom: 1rem;
		max-width: 700px;
	}

	.section-subtitle {
		font-size: var(--font-m);
		line-height: var(--lh-m);
		text-align: center;
		font-weight: 500;
		padding: 0 1.5rem;
		max-width: 700px;
	}

	.comparison-title {
		text-wrap: balance;
		margin-bottom: 0.6875rem;
	}

	.comparison-subtitle {
		margin-bottom: 3.75rem;
	}

	.salary-title {
		margin-top: 7rem;
		margin-bottom: 2rem;
	}

	.hotel-section {
		margin-top: 4rem;
	}

	.chart-container {
		width: 100%;
		max-width: calc(1400px - 3rem);
	}

	.testimonials-title {
		margin-top: 7rem;
		margin-bottom: 1.125rem;
	}

	.testimonials-section {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.map-title {
		margin-top: 7rem;
	}

	.map-subtitle {
		margin-bottom: 1.624rem;
	}

	.map-section {
		margin-bottom: 1rem;
	}

	.liberate-section {
		margin-left: calc(-1 * var(--hpadding));
		margin-right: calc(-1 * var(--hpadding));

		width: 100vw;
		background-color: var(--color-lime);
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 0 var(--hpadding);
		padding-bottom: 3rem;
		position: relative;
		&::after {
			content: '';
			width: 100%;
			height: 4rem;
			background: var(--bg-low);
			position: absolute;
			top: 0;
			left: 0;
			border-bottom-left-radius: 4rem;
			border-bottom-right-radius: 4rem;
			box-shadow: 0 0.2rem 1rem var(--color-dark-grey);
		}
	}

	.what-about {
		max-width: 700px;

		& > :not(:last-child) {
			margin-bottom: 1.5rem;
		}
	}

	.stalisce-btn {
		display: flex;
		align-items: center;
		gap: 1rem;

		border-radius: 20px;
		border: 2px solid var(--color-black);
		margin-top: 2.5rem;
		margin-bottom: 4rem;
		padding: 0.625rem 2rem 0.625rem 0.75rem;

		background-color: var(--color-neon-green);
		color: var(--color-black);
		font-size: var(--font-m);
		line-height: var(--lh-m);
		font-weight: 700;
		text-decoration: none;
	}

	.circle {
		position: relative;
		background-color: var(--color-white);
		height: 40px;
		width: 40px;
		border-radius: 50%;
	}

	.stalisce-icon {
		position: absolute;
		top: 4px;
		left: -4px;
	}

	.liberate-container {
		width: 100%;
		max-width: 1400px;
		padding-top: 4rem;
		position: relative;
	}

	.source {
		font-style: italic;
	}
</style>
