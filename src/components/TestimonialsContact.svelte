<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Quote from '$lib/assets/icons/quote.svelte';
	import Arrow from '$lib/assets/icons/arrow.svelte';
</script>

<div class="contact-container">
	<div class="contact-icon">
		<Quote />
	</div>
	<p class="contact-text contact-title">
		{$_('testimonialsContent.title')}
	</p>
	<div class="contact-icon contact-arrow">
		<Arrow />
	</div>
	<p class="contact-text">
		{$_('testimonialsContent.description')}
	</p>
	<div class="contact-icon contact-arrow">
		<Arrow />
	</div>
	<p class="contact-text">
		{$_('testimonialsContent.mail.part1')}
		<a
			href="mailto:airbnbpejtstran@djnd.si?subject=Izjava o AirBnB"
			class="contact-link"
			target="_blank"
			rel="external noopener noreferrer">airbnbpejtstran@djnd.si</a
		>,
		{$_('testimonialsContent.mail.part2')}
	</p>
</div>

<style>
	.contact-container {
		width: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1.5rem;

		padding: 2rem;
		color: var(--color-white);
		border-radius: 25px;
		border: 2px solid var(--color-white);
		text-wrap: balance;

		@media screen and (max-width: 1000px) {
			flex-direction: column;
			text-align: center;

			& .contact-arrow {
				transform: rotate(90deg);
			}
		}
	}

	.contact-title {
		flex-grow: 1;
		font-size: var(--font-l);
		line-height: var(--lh-l);
		font-weight: 700;
		text-transform: uppercase;
	}

	.contact-text {
		flex-grow: 1;
		font-size: var(--font-m);
		line-height: var(--lh-m);
		font-weight: 500;
	}

	.contact-icon {
		width: fit-content;
		height: fit-content;
	}

	.contact-arrow {
		@media screen and (max-width: 767px) {
			transform: rotate(90deg);
		}
	}

	.contact-link {
		color: var(--color-black);
		background-color: var(--color-neon-green);
	}
</style>
