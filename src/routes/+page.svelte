<script lang="ts">
  import banner from '$lib/assets/banner.png'
  import lock from '$lib/assets/lock.png'
	import { _ } from 'svelte-i18n'
	import IncomeChart from '../components/IncomeChart.svelte';
	import CurrentRestrictionsMap from '../components/CurrentRestrictionsMap.svelte'
</script>
<svelte:head>
    <title>{$_('landing.head.title')}</title> 
</svelte:head>

<div class="landing">
  <img class="banner" src={banner} alt="airbnb-domov" />
  <p class="top-header">{$_('landing.topHeader')}</p>
  <div class="info-cards">
    <div class="info-card info-card-purple">
      <div class="info-card-body">
        <h2 class="info-card-title">{$_('landing.airbnbApartments.title', {
          values: {
            total: 1515
          }
        })}</h2>
        <p class="info-card-title-appendix">{$_('trenutno aktivnih Airbnb oglasov v Ljubljani')}</p>
        <p class="info-card-content">{$_('landing.airbnbApartments.content')}</p>
        <a class="info-source" href="https://podcrto.si/stanovanjska-problematika-kdo-si-lahko-privosci-lasten-dom-v-ljubljani/">{$_('source')}</a>
      </div>
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
    max-width: 1200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
  }

  .top-header {
    max-width: 600px;
    font-size: 2.25rem;
    font-weight: 500;
    margin: 3rem 0;
    text-align: center;
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

  .banner{
    width: 100%;
  }

  .info-cards {
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
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

  .info-image {
    width: 256px;
  }

  .info-text {
    font-weight: 700;
    text-align: center;
    margin-top: 1.5rem;
    line-height: 1.25;
  }

  .info-card-purple {
    background-color: var(--color-purple);
    color: var(--color-white);
  }

  .info-card-lime {
    background-color: var(--color-lime);
    color: var(--color-black);
  }

  .info-source {
    margin-top: 1rem;
    font-size: var(--font-s);
    line-height: var(--lh-s);
    font-style: italic;
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
