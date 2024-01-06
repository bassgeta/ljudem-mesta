<script lang="ts">
  import graph from '$lib/assets/airbnb-graf.jpg'
	import { _ } from 'svelte-i18n'
</script>
<svelte:head>
    <title>{$_('landing.title')}</title> 
</svelte:head>

<div class="landing">
  <div class="info-card">
    <p class="info">{$_('landing.allApartments', {
      values:{
        total: '129.816',
        households: '130.575',
        difference: '759'
      }
    })}</p>
  </div>
  <div class="info-card">
    <p class="info">{$_('landing.emptyApartments', {
      values:{
        total: '23.050',
        percentage: '17.75'
      }
    })}</p>
  </div>
  <div class="info-card">
    <p class="info">{$_('landing.airbnbApartments', {
      values:{
        total: 1515,
        averagePrice: 115.6,
        occupancyRate: 64,
        averagePriceAdjusted: 78.3,
      }
    })}</p>
  </div>
  <img class="image" src={graph} alt="Graph" />
  <h1 class="heading">{$_('landing.heading')}</h1>
  <div class="info-card">
    <p class="info">{$_('landing.guiltTrip')}</p>
  </div>
  <h1 class="solutions-heading">{$_('landing.solutionsHeading')}</h1>
  <div class="info-card solution-card">
    <a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals" target="_blank" rel="noopener">{$_('landing.solution.dunaj')}</a>
    <a href="https://www.thelocal.fr/20230807/paris-increasing-crackdowns-on-airbnb-rentals" target="_blank" rel="noopener">{$_('landing.solution.france')}</a>
    <a href="https://www.telegraph.co.uk/travel/destinations/europe/germany/berlin/articles/airbnb-listings-plummet-in-berlin-as-ban-comes-into-force/" target="_blank" rel="noopener">{$_('landing.solution.berlin')}</a>
    <a href="https://www.reuters.com/markets/europe/italy-crackdown-targets-1-bln-euros-undeclared-short-term-flat-rental-tax-2023-10-30/" target="_blank" rel="noopener">{$_('landing.solution.italy')}</a>
    <a href="https://apps.eurofound.europa.eu/platformeconomydb/regulations-of-airbnb-in-the-netherlands-105714" target="_blank" rel="noopener">{$_('landing.solution.netherlands')}</a>
    <a href="https://www.businessinsider.com/portugal-bans-new-airbnbs-fears-becoming-some-sort-of-disneyland-2023-2" target="_blank" rel="noopener">{$_('landing.solution.portugal')}</a>
    <a href="https://www.nytimes.com/2021/09/22/travel/barcelona-airbnb.html" target="_blank" rel="noopener">{$_('landing.solution.spain')}</a>
    <a href="https://www.wired.co.uk/article/airbnb-london-short-term-rentals" target="_blank" rel="noopener">{$_('landing.solution.uk')}</a>
    <a href="https://www.wired.com/story/airbnb-ban-new-york-city/" target="_blank" rel="noopener">{$_('landing.solution.newYork')}</a>
    <a href="https://storeys.com/bc-short-term-rentals-legislation/" target="_blank" rel="noopener">{$_('landing.solution.canada')}</a>
    <a href="https://interestingasia.com/2023/11/is-airbnb-doomed-in-asia" target="_blank" rel="noopener">{$_('landing.solution.asia')}</a>
  </div>
</div>

<style>
  @keyframes pulsate {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }

  .landing {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

    padding: 1.5rem 1.5rem;
  }

  .heading {
    text-align: center;
    animation: pulsate 2s infinite;
  }

  .solutions-heading {
    text-align: center;
    margin-top: 1.5rem;
  }

  .info-card {
    padding: 1rem;
    background-color: var(--color-medium-grey);
  }

  .info {
    font-size: 1.25rem;
    line-height: 1.25;
    font-weight: bold;
    text-align: center;
    color: var(--text-primary);
  }

  .solution-card {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--color-orange-red);
  }

  .image {
    max-width: 100%;
  }
</style>
