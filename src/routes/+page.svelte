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
	import og from '../lib/assets/airbnb-og.jpg';
	import PriceChart from '../components/PriceChart.svelte';
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
	<meta property="og:image" content="/airbnb-og.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://airbnbpejtdomov.si/" />
	<meta property="twitter:title" content="{$_('landing.head.title')}" />
	<meta property="twitter:description" content="{$_('landing.head.description')}" />
	<meta property="twitter:image" content="/airbnb-og.jpg" />
	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

<div class="landing">
	<Header />
	<p class="top-header">{$_('landing.topHeader')}</p>
	<div class="landing-section">
		<InfoCards />
	</div>
	<h2 class="section-title salary-title">
		{$_('landing.salary.title')}
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
</div>
<div class="liberate-section">
	<div class="liberate-container">
		<Liberate />
	</div>
</div>

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

		margin-top: 10.375rem;
		margin-bottom: 2.375rem;
	}

	.section-subtitle {
		font-size: var(--font-m);
		line-height: var(--lh-m);
		text-align: center;
		font-weight: 500;
		padding: 0 1.5rem;
	}

	.comparison-title {
		text-wrap: balance;
		margin-bottom: 0.6875rem;
	}

	.comparison-subtitle {
		margin-bottom: 3.75rem;
	}

	.salary-title {
		margin-top: 10.375rem;
		margin-bottom: 2.375rem;
	}

	.hotel-section {
		margin-top: 4rem;
	}

	.chart-container {
		width: 100%;
		max-width: calc(1400px - 3rem);
	}

	.testimonials-title {
		margin-top: 9.875rem;
		margin-bottom: 1.125rem;
	}

	.testimonials-section {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.map-title {
		margin-top: 10.5rem;
		margin-bottom: 0.375rem;
	}

	.map-subtitle {
		margin-bottom: 1.624rem;
	}

	.map-section {
		margin-bottom: 3rem;
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

	.liberate-container {
		width: 100%;
		max-width: 1400px;
		padding-top: 4rem;
		position: relative;
	}
</style>
