<script>
	import LocaleSwitcher from '../components/LocaleSwitcher.svelte'
	import CurrentRestrictionsMap from '../components/CurrentRestrictionsMap.svelte'

  import '../global.css'
  import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'
</script>

<div class="page">
  <CurrentRestrictionsMap />
  <LocaleSwitcher />
  
  <slot />
</div>

<style>
  .page {
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    overflow-y: auto;
    background-color: var(--bg-low);
  }
</style>
