<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Liberate from '../../components/Liberate.svelte';
</script>

<svelte:head>
	<title>{$_('liberatePage.head.title')}</title>
</svelte:head>

<div class="liberate-page">
	<Liberate />
</div>

<style>
	.liberate-page {
		width: 100%;
		background-color: var(--color-lime);
	}
</style>
