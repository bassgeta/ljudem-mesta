<script>
  import '../global.css'
</script>

<div class="page">
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
