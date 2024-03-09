<script lang="ts">
	import banner from '$lib/assets/banner.png';
	import { _ } from 'svelte-i18n';
	import IncomeChart from '../components/IncomeChart.svelte';
	import CurrentRestrictionsMap from '../components/CurrentRestrictionsMap.svelte';
	import ComparisonTable from '../components/ComparisonTable.svelte';
	import HotelNumbers from '../components/HotelNumbers.svelte';
	import Testimonials from '../components/Testimonials.svelte';
</script>

<svelte:head>
	<title>{$_('landing.head.title')}</title>
</svelte:head>

<div class="landing">
	<img class="banner" src="{banner}" alt="airbnb-domov" />
	<p class="top-header">{$_('landing.topHeader')}</p>
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
					href="https://podcrto.si/stanovanjska-problematika-kdo-si-lahko-privosci-lasten-dom-v-ljubljani/"
					>{$_('source')}</a>
			</div>
		</div>
	</div>
	<h2 class="section-title salary-title">
		{$_('landing.salary.title')}
	</h2>
	<div class="chart-container">
		<IncomeChart />
	</div>
	<h2 class="section-title comparison-title">
		{$_('landing.comparison.title')}
	</h2>
	<p class="section-subtitle comparison-subtitle">
		{$_('landing.comparison.subtitle')}
	</p>
	<ComparisonTable />
	<div class="hotel-section">
		<HotelNumbers />
	</div>
	<h2 class="section-title testimonials-title">
		{$_('landing.testimonials.title')}
	</h2>
	<div class="testimonials-section">
		<Testimonials />
	</div>
	<h2 class="section-title map-title">
		{$_('landing.map.title')}
	</h2>
	<p class="section-subtitle map-subtitle">
		{$_('landing.map.subtitle')}
	</p>
	<CurrentRestrictionsMap />
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
	}

	.banner {
		width: 100%;
	}

	.info-cards {
		width: 100%;
		padding: 0 1.5rem;

		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: space-evenly;
		gap: 2rem;

		@media only screen and (max-width: 767px) {
			flex-direction: column;
			align-items: center;
		}

		& > div {
			max-width: 580px;
			flex-grow: 1;
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
	}

	.section-subtitle {
		font-size: var(--font-m);
		line-height: var(--lh-m);
		text-align: center;
		font-weight: 500;
	}

	.comparison-title {
		margin-top: 10rem;
		padding: 0 1.5rem;
	}

	.comparison-subtitle {
		margin-top: 1rem;
		margin-bottom: 3rem;
	}

	.salary-title {
		text-align: center;
		margin-top: 10rem;
		margin-bottom: 3rem;
		padding: 0 1.5rem;
	}

	.hotel-section {
		margin-top: 2rem;
		width: 100%;
		padding: 0 1.5rem;
	}

	.chart-container {
		width: calc(100vw - 3rem);
		max-width: calc(1400px - 3rem);
		min-height: 60vh;
	}

	.salary-title {
		text-align: center;
		margin-top: 10rem;
		margin-bottom: 3rem;
		padding: 0 1.5rem;
	}

	.testimonials-title {
		margin-top: 10rem;
		margin-bottom: 3rem;
		padding: 0 1.5rem;
	}

	.testimonials-section {
		width: 100%;
		max-width: 100%;
		padding: 0 1.5rem;
	}

	.map-title {
		margin-top: 10rem;
		padding: 0 1.5rem;
	}

	.map-subtitle {
		margin-top: 1rem;
		margin-bottom: 3rem;
	}
</style>
