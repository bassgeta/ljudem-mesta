<script lang="ts">
	import banner from '$lib/assets/banner.png';
	import { _ } from 'svelte-i18n';
	import IncomeChart from '../components/IncomeChart.svelte';
	import CurrentRestrictionsMap from '../components/CurrentRestrictionsMap.svelte';
	import ComparisonTable from '../components/ComparisonTable.svelte';
	import HotelNumbers from '../components/HotelNumbers.svelte';
	import Testimonials from '../components/Testimonials/Testimonials.svelte';
	import Liberate from '../components/Liberate.svelte';
	import TestimonialsContact from '../components/TestimonialsContact.svelte';
</script>

<svelte:head>
	<title>{$_('landing.head.title')}</title>
</svelte:head>

<div class="landing">
	<img class="banner" src="{banner}" alt="airbnb-domov" />
	<p class="top-header">{$_('landing.topHeader')}</p>
	<div class="landing-section info-cards">
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
				<h2 class="info-card-title">
					{$_('landing.hostNumbers.title', {
						values: {
							percent: 92
						}
					})}
				</h2>
				<p class="info-card-title-appendix">{$_('landing.hostNumbers.titleAppendix')}</p>
				<p class="info-card-content">{$_('landing.hostNumbers.content')}</p>
				<a
					class="info-source"
					target="_blank"
					href="https://podcrto.si/stanovanjska-problematika-kdo-si-lahko-privosci-lasten-dom-v-ljubljani/"
					>{$_('source')}</a>
			</div>
		</div>
	</div>
	<h2 class="section-title salary-title">
		{$_('landing.salary.title')}
	</h2>
	<div class="landing-section chart-container">
		<IncomeChart />
	</div>
	<h2 class="section-title comparison-title">
		{$_('landing.comparison.title')}
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

<style>
	.landing {
		width: 100%;
		max-width: 1400px;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.top-header {
		max-width: 600px;
		font-size: 2.25rem;
		font-weight: 500;
		margin: 3rem 0;
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

	.info-cards {
		width: 100%;

		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: space-between;
		gap: 2rem;

		@media screen and (max-width: 767px) {
			flex-direction: column;
			align-items: center;
		}

		& > div {
			max-width: 580px;
			flex: 1;
		}
	}

	.info-card-title {
		font-size: var(--font-xxxl);
		line-height: var(--lh-xxxl);
		font-weight: bold;
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
		color: var(--color-white);
	}

	.info-card-lime {
		background-color: var(--color-lime);
		color: var(--text-secondary);
	}

	.info-source {
		margin-top: auto;
		font-size: var(--font-s);
		line-height: var(--lh-s);
		font-style: italic;
	}

	.section-title {
		font-size: var(--font-xl);
		line-height: var(--lh-xl);
		font-weight: 700;
		padding: 0 1.5rem;
		text-align: center;
	}

	.section-subtitle {
		font-size: var(--font-m);
		line-height: var(--lh-m);
		text-align: center;
		font-weight: 500;
		padding: 0 1.5rem;
	}

	.comparison-title {
		margin-top: 3rem;
	}

	.comparison-subtitle {
		margin-top: 1rem;
		margin-bottom: 3rem;
	}

	.salary-title {
		margin-top: 4rem;
		margin-bottom: 3rem;
	}

	.hotel-section {
		margin-top: 4rem;
	}

	.chart-container {
		width: 100%;
		max-width: calc(1400px - 3rem);
	}

	.testimonials-title {
		margin-top: 4rem;
		margin-bottom: 1.5rem;
	}

	.testimonials-section {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.map-title {
		margin-top: 4rem;
	}

	.map-subtitle {
		margin-top: 1rem;
		margin-bottom: 3rem;
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
	}

	.liberate-container {
		width: 100%;
		max-width: 1400px;
		padding-top: 4rem;
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
</style>
