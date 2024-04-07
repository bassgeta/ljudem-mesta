<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ApartmentBuilding from '../../components/ApartmentBuilding.svelte';
	import Arrow from '$lib/assets/icons/arrow.svelte';
</script>

<svelte:head>
	<title>{$_('liberatePage.head.title')}</title>
</svelte:head>

<div class="liberate-page">
	<a href="/" class="shadowed-card shadowed-button back-to-link">
		<span class="left-arrow">
			<Arrow />
		</span>
		{$_('liberatePage.go-to-campaign')}
	</a>
	<ApartmentBuilding />
</div>

<style>
	.liberate-page {
		position: relative;
		width: 100vw;
		height: 100%;
	}

	.back-to-link {
		position: absolute;
		z-index: 2;
		top: 16px;
		left: 16px;
	}

	.left-arrow {
		transform: rotateY(180deg);
	}
</style>
