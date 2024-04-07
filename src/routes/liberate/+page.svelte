<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ApartmentBuilding from '../../components/ApartmentBuilding.svelte';
	import Arrow from '$lib/assets/icons/arrow.svelte';
</script>

<svelte:head>
	<title>{$_('liberatePage.head.title')}</title>
</svelte:head>

<div class="liberate-page">
	<a href="/" class="liberate-card back-to-link">
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

		display: flex;
		align-items: center;
		gap: 1rem;

		background-color: var(--color-white);
		font-weight: 700;
		font-size: var(--font-m);
		text-decoration: none;

		padding: 1rem 1.5rem;
		margin-top: 2rem;
	}

	.left-arrow {
		transform: rotateY(180deg);
	}
</style>
