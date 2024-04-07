<script lang="ts">
	export let testimonial: string = '';
</script>

<div class="testimonial-card">
	<div class="testimonial-content">
		{testimonial}
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
		line-height: var(--lh-s);
		max-height: 60vh;
		overflow-y: auto;
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
