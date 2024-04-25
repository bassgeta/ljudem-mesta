<script lang="ts">
	import { _ } from 'svelte-i18n';
	import bag from '../lib/assets/figure/bag.png';
</script>

<div class="info-card hotel-numbers-container">
	<div class="info-card-body hotel-numbers-body">
		<div class="hotel-numbers-info">
			<p class="hotel-numbers-text">
				{$_('hotelNumbers.content')}
			</p>
			<a
				class="hotel-numbers-source"
				target="_blank"
				href="https://www.mladina.si/229092/airbnb-nepremicninski-divji-zahod/">{$_('source')}</a>
		</div>
		<div class="hotel-numbers-graphics">
			<div class="bg">
				<div class="circle"></div>
				<div class="circle"></div>
				<div class="circle"></div>
			</div>
			<img src="{bag}" alt="Vreča denarja" />
			<img src="{bag}" alt="Vreča denarja" />
			<img src="{bag}" alt="Vreča denarja" />
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
		text-wrap: balance;
	}

	.hotel-numbers-source {
		margin-top: 1rem;
		font-size: var(--font-s);
		line-height: var(--lh-s);
		font-style: italic;
	}

	.hotel-numbers-body {
		display: flex;
		flex-direction: row;
		gap: 8px;
		align-items: center;
		@media only screen and (max-width: 767px) {
			flex-direction: column-reverse;
		}
	}
	.hotel-numbers-graphics {
		padding-right: 1rem;
		--siz: calc(var(--size) / 9);
		@media only screen and (max-width: 767px) {
			--siz: calc(var(--size) / 5);
			margin-bottom: 2rem;
		}
		position: relative;
		display: flex;
		gap: calc(var(--siz) / 5);
		& .bg {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			width: calc(var(--siz) * 3);

			& .circle {
				z-index: 1;
				border-radius: 50%;
				width: var(--siz);
				height: var(--siz);
				transform: scale(1.1);
				background: #ffe8ce;
				&:not(:first-child) {
					margin-left: calc(var(--siz) * -0.1);
				}
			}
		}
		& img {
			position: relative;
			z-index: 2;
			width: var(--siz);
			transform-origin: center right;
			transform: scale(0.8) rotate(-5deg);
			 &:nth-child(even) {
			transform: scale(0.8) rotate(2deg);

			 }
				&:not(:first-child) {
					margin-left: calc(var(--siz) * -0.2);
				}
		}
	}
</style>
