<script lang="ts">
	import banner from '$lib/assets/banner.png';
	import { _ } from 'svelte-i18n';
	import IncomeChart from '../components/IncomeChart.svelte';
	import CurrentRestrictionsMap from '../components/CurrentRestrictionsMap.svelte';
	import ComparisonTable from '../components/ComparisonTable.svelte';
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
	<div class="small-lore">
		<p>{$_('landing.guiltTrip')}</p>
	</div>
	<div class="small-lore">
		<p>{$_('landing.hotelNumbers')}</p>
	</div>
	<CurrentRestrictionsMap />
</div>

<style>
	.landing {
		max-width: 1200px;
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

		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: center;
		gap: 2rem;

		@media only screen and (max-width: 767px) {
			flex-direction: column;
			align-items: center;
		}
	}

	.info-card {
		max-width: 580px;

		border-radius: 25px;
		padding: 1rem;
	}

	.info-card-body {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		border-radius: 11px;
		border: 2px solid;
		padding: 1.5rem;
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
		font-size: var(--font-m);
		line-height: var(--lh-m);
	}

	.info-card-purple {
		background-color: var(--color-purple);
		color: var(--color-white);
	}

	.info-card-light-green {
		background-color: var(--color-light-green);
		color: var(--text-secondary);
	}

	.info-card-pink {
		background-color: var(--color-pink);
		color: var(--text-secondary);
	}

	.info-card-lime {
		background-color: var(--color-lime);
		color: var(--text-secondary);
	}

	.info-source {
		margin-top: 1rem;
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
	}

	.comparison-subtitle {
		margin-top: 1rem;
		margin-bottom: 3rem;
	}

	.salary-title {
		text-align: center;
		margin-top: 10rem;
		margin-bottom: 3rem;
	}

	.small-lore {
		width: 90%;
		border-top: 1px solid var(--text-primary);
		border-bottom: 1px solid var(--text-primary);
		padding: 4rem 2rem;
		text-align: center;
	}

	.chart-container {
		width: 100vw;
		min-height: 60vh;
		padding: 1.5rem;
	}
</style>
