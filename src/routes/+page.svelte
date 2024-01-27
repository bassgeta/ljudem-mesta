<script lang="ts">
  import logo from '$lib/assets/logo.png'
  import lock from '$lib/assets/lock.png'
	import { _ } from 'svelte-i18n'
	import IncomeChart from '../components/IncomeChart.svelte';
</script>
<svelte:head>
    <title>{$_('landing.head.title')}</title> 
</svelte:head>

<div class="landing">
  <div class="title-hero">
    <img class="logo" src={logo} alt="airbnb-domov" />
    <div class="titles">
      <h1>{$_('landing.title')}</h1>
      <h2>{$_('landing.subtitle')}</h2>
    </div>
  </div>
  <div class="info-cards">
    <div class="info-card">
      <img class="info-image" src={lock} alt="lock" />
      <p class="info-text">{$_('landing.allApartments', {
        values:{
          total: '129.816',
          households: '130.575',
          difference: '759'
        }
      })}</p>
      <a class="info-source" href="https://podcrto.si/stanovanjska-problematika-kdo-si-lahko-privosci-lasten-dom-v-ljubljani/">{$_('source')}</a>
    </div>
    <div class="info-card">
      <img class="info-image" src={lock} alt="lock" />
      <p class="info-text">{$_('landing.emptyApartments', {
        values:{
          total: '23.050',
          percentage: '17.75'
        }
      })}</p>
      <a class="info-source" href="https://podcrto.si/stanovanjska-problematika-kdo-si-lahko-privosci-lasten-dom-v-ljubljani/">{$_('source')}</a>
    </div>
    <div class="info-card">
      <img class="info-image" src={lock} alt="lock" />
      <p class="info-text">{$_('landing.airbnbApartments', {
        values:{
          total: 1515,
          averagePrice: 115.6,
          occupancyRate: 64,
          averagePriceAdjusted: 78.3,
        }
      })}</p>
      <a class="info-source" href="https://app.airdna.co/data/si/35218?tab=performance">{$_('source')}</a>
    </div>
    <div class="info-card">
      <img class="info-image" src={lock} alt="lock" />
      <p class="info-text">{$_('landing.hostNumbers')}</p>
      <a class="info-source" href="https://www.urbaniizziv.si/Portals/urbaniizziv/Clanki/2020/uizziv-31-20201-strokovna_07.pdf">{$_('source')}</a>
    </div>
  </div>
  <div class="small-lore">
    <p>{$_('landing.guiltTrip')}</p>
  </div>
  <div class="chart-container">
    <IncomeChart />
  </div>
  <div class="small-lore">
    <p>{$_('landing.hotelNumbers')}</p>
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
  .landing {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
  }

  .title-hero {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 1.5rem;
    background-color: var(--bg-medium);

    @media only screen and (max-width: 767px) {
      flex-direction: column;
    }
  }

  .logo {
    height: 400px;
  }

  .titles {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    @media only screen and (max-width: 767px) {
      align-items: center;
    }
  }

  .info-cards {
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5rem;

    padding: 1.5rem;

    @media only screen and (max-width: 767px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .info-card {
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info-image {
    width: 256px;
  }

  .info-text {
    font-weight: 700;
    text-align: center;
    margin-top: 1.5rem;
    line-height: 1.25;
  }

  .info-source {
    align-self: end;
    margin-top: .5rem;
  }

  .small-lore {
    width: 90%;
    border-top: 1px solid var(--text-primary);
    border-bottom: 1px solid var(--text-primary);
    padding: 4rem 2rem;
    text-align: center;
  }

  .solutions-heading {
    text-align: center;
    margin-top: 1.5rem;
  }

  .info {
    font-size: 1.25rem;
    line-height: 1.25;
    font-weight: bold;
    text-align: center;
    color: var(--text-primary);
  }

  .chart-container {
    width: 100%;
    padding: 0 1.5rem;
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
