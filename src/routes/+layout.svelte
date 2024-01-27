<script>
	import LocaleSwitcher from '../components/LocaleSwitcher.svelte';
  import '../global.css'
</script>

<div class="page">
  <LocaleSwitcher />
  <slot />
</div>

<style>
  .page {
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    overflow-y: auto;
  }
</style>
