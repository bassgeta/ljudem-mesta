<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import Block from '../../components/Block/Block.svelte';
	import { onMount } from 'svelte';
	import { fetchTotalLiberated } from '../../utils/liberation';

	let totalLiberated = 0;

	onMount(async () => {
		const total = await fetchTotalLiberated();
		totalLiberated = total ?? 0;
	});

	function onAdd() {
		totalLiberated += 1;
	}
</script>

<svelte:head>
	<title>{$_('liberatePage.head.title')}</title>
</svelte:head>

<div class="liberate-page">
	<div class="header">
		<a href="/" class="shadowed-card shadowed-button">
			<span class="left-arrow">
				<Arrow />
			</span>
			{$_('liberatePage.go-to-campaign')}
		</a>
		<div class="shadowed-card shadowed-button total-liberated">
			<p>
				Osvobojenih že
				<span class="counter">{totalLiberated}</span>
				stanovanj!
			</p>
		</div>
	</div>
	<div class="block-container">
		<Block onAdd="{onAdd}" fullscreen />
	</div>
	<div class="footer"></div>
</div>

<style>
	.liberate-page {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		max-height: 100vh;
	}

	.block-container {
		flex: 1;
		min-height: 0;
	}

	.header {
		height: 88px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		padding: 1rem;
	}

	.footer {
		height: 88px;
	}

	.total-liberated {
		@media screen and (max-width: 767px) {
			position: absolute;
			bottom: 16px;
			left: 16px;
		}
	}

	.counter {
		background-color: var(--color-neon-green);
	}

	.left-arrow {
		transform: rotateY(180deg);
	}
</style>
