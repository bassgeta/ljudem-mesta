<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="info-card hotel-numbers-container">
	<div class="info-card-body">
		<div class="hotel-numbers-info">
			<p class="hotel-numbers-text">
				{$_('hotelNumbers.content')}
			</p>
			<a
				class="hotel-numbers-source"
				href="https://www.mladina.si/229092/airbnb-nepremicninski-divji-zahod/">{$_('source')}</a>
		</div>
	</div>
</div>

<style>
	.hotel-numbers-container {
		width: 100%;
		display: flex;
		flex-direction: row;

		background-color: var(--color-blue);
		color: var(--color-black);
	}

	.hotel-numbers-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.hotel-numbers-text {
		font-size: var(--font-m);
		line-height: var(--lh-m);
	}

	.hotel-numbers-source {
		margin-top: 1rem;
		font-size: var(--font-s);
		line-height: var(--lh-s);
		font-style: italic;
	}
</style>
