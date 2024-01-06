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
  <h1 class="heading">{@html ($_('landing.heading'))}</h1>
  <div class="info-card">
    <p class="info">{$_('landing.guiltTrip')}</p>
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

  .image {
    max-width: 100%;
  }
</style>
