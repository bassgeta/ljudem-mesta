<script lang="ts">
  import logo from '$lib/assets/logo.png'
  import lock from '$lib/assets/lock.png'
	import { _ } from 'svelte-i18n'
	import IncomeChart from '../components/IncomeChart.svelte';
	import CurrentRestrictionsMap from '../components/CurrentRestrictionsMap.svelte'
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
  <CurrentRestrictionsMap />
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

  .chart-container {
    max-height: 40vh;
    padding: 0 1.5rem;
  }
</style>
