<script lang="ts">
	export let testimonial: string = '';
	export let source: string = 'Anonimno';
</script>

<div class="testimonial-card">
	<div class="testimonial-content">
		{@html testimonial}
		<div>Vir: {source}</div>
	</div>
	<div class="triangle"></div>
</div>

<style>
	.testimonial-card {
		display: flex;
		flex-direction: column;

		width: 100%;
	}

	.testimonial-content {
		background-color: var(--color-lime);
		color: var(--color-black);
		border-radius: 15px;
		padding: 2rem;
		font-size: var(--font-s);
		line-height: 1.625rem;
		max-height: 60vh;
		overflow-y: auto;

		& br {
			margin-bottom: 1rem;
		}

		& div {
			margin-top: 1.375rem;
			font-size: 0.875rem;
			font-style: italic;
			font-weight: 400;
			line-height: 1.05rem;
		}
	}

	.triangle {
		margin-left: 2rem;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 20.8px 12px 0 12px;
		border-color: var(--color-lime) transparent transparent transparent;
	}
</style>
