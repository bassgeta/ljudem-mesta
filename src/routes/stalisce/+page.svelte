<script lang="ts">
	import { _ } from 'svelte-i18n';
	import stalisceImg from '$lib/assets/figure/stalisce.png';
</script>

<svelte:head>
	<title>{$_('position.head.title')}</title>
</svelte:head>

<div class="position-page">
	<div class="heading">
		<h1>Airbnb, pejd domov!</h1>

		<p>
			13. maja 2024 je Ministrstvo za gospodarstvo, turizem in šport v javno obravnavo končno
			poslalo Zakon o gostinstvu, ki prinaša določene omejitve glede kratkotrajnega oddajanja.
		</p>

		<p>
			Zakon je korak v pravo smer, vendar opozarjamo na nekaj pomankljivosti, ki bi lahko zmanjšale
			njegov učinek.
		</p>

		<p>
			Zavzeti se moramo za čim strožjo verzijo, ki ne bo dopuščala izigravanja. Preberi naše
			stališče na predlog zakona in tudi ti sodeluj v javni razpravi!
		</p>
	</div>
	<div class="content">
		<h2>KAKO LAHKO ZAKON ŠE IZBOLJŠAMO?</h2>
		<div class="info-card info-card-comment">
			<div class="info-card-body">
				<div>
					<h3>TUDI TI LAHKO ODDAŠ KOMENTAR NA PREDLOG ZAKONA!</h3>
					<p>
						Vsakdo lahko odda komentar na predlog zakona na portalu eDemokracija. Vse, kar moraš
						storiti je, da skopiraš naš komentar! P.S.: Seveda pa lahko pripraviš tudi svoj predlog.
					</p>
				</div>
				<div class="stalisce-bubble">
					<img src="{stalisceImg}" />
				</div>
			</div>
		</div>

		<a>Prenesi dokument s celotnim komentarjem</a>

		<a>Obišči portal eDemokracija in oddaj komentar!</a>
	</div>
</div>

<style>
	.position-page {
		text-wrap: balance;
	}

	.heading {
		width: min(calc(100vw - 32px), 900px);
		margin: 6.125rem auto 7rem auto;

		& p {
			font-size: 2.25rem;
			font-weight: 500;
			line-height: 2.75rem;
			text-align: center;
			&:not(:last-child) {
				margin-bottom: 2.75rem;
			}
		}
	}

	h1 {
		color: var(--color-red);
		font-size: 60px;
		font-weight: 600;
		line-height: 58px;
		text-align: left;

		margin-bottom: 5.575rem;
		text-align: center;
	}

	h2 {
		font-size: 2.625rem;
		font-weight: 700;
		line-height: 3.125rem;
		margin-bottom: 4.25rem;
	}

	.content {
		padding: 0 var(--hpadding);
		padding-top: 4rem;
		background: var(--color-lime);
		color: black;
	}

	.info-card-comment {
		background-color: var(--color-blue);
		color: var(--color-black);
		& .info-card-body {
			display: flex;
			flex-direction: row;
			gap: 2rem;
			@media screen and (max-width: 767px) {
				flex-direction: column-reverse;
			}
		}

		& h3 {
			max-width: 657px;
			font-size: 2.25rem;
			font-weight: 700;
			line-height: 2.375rem;
			margin-bottom: 1.5rem;
		}

		& p {
			font-size: 1.3125rem;
			font-weight: 500;
			line-height: 1.75rem;
		}

		& .stalisce-bubble {
			--siz: min(176px, 20vw);
			width: var(--siz);
			height: var(--siz);
			border-radius: 50%;
			background: var(--color-light-orange);
			position: relative;
			flex-shrink: 0;

			& img {
				--sizz: calc(var(--siz) * 0.96);
				width: var(--sizz);
				position: absolute;
				top: 50%;
				right: 20%;
				transform: translate(0, -50%);
			}
		}
	}
</style>
