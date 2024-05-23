<script lang="ts">
	import Donate from '$lib/assets/icons/donate.svelte';
	import euImage from '$lib/assets/eu-cofunded.png';
</script>

<div class="footer">
	<div class="credits">
		<p>
			Spletno mesto je pripravil{' '}
			<a
				href="https://danesjenovdan.si/"
				target="_blank"
				rel="noopener noreferrer"
				class="credits-link">
				Danes je nov dan
			</a>
			{' '}v sodelovanju z aktivnimi državljani.
		</p>
		<a
			href="https://danesjenovdan.si/doniraj"
			target="_blank"
			rel="noopener noreferrer"
			class="shadowed-card shadowed-button support-btn">
			<span>Podpri naše delo!</span>
			<div class="donate-container">
				<div class="donate-image">
					<Donate />
				</div>
			</div></a>
	</div>
	<div class="info-section">
		<div class="info-part">
			<a href="mailto:vsi@danesjenovdan.si" class="email-link">vsi@danesjenovdan.si</a>
			<a
				href="https://docs.google.com/document/d/1qcUCGS8QwpUXW0NUUIqZjGZTElXM5o18V3UksZo6KWw"
				class="privacy-policy">Politika zasebnosti in varovanja osebnih podatkov</a>
		</div>
		<div class="info-part">
			<p class="">
				Projekt je del iniciative{' '}
				<a
					href="https://stanovanjskiblok.si/"
					target="_blank"
					rel="noopener noreferrer"
					class="blok-link">
					Stanovanjski blok
				</a>
				.
			</p>
			<p>Pridruži se nam v prihodnjih bojih za boljšo stanovanjsko politiko!</p>
		</div>
	</div>
	<div class="eu-funding">
		<img src="{euImage}" class="eu-image" />
		<p class="eu-text">
			Financirano s strani Evropske unije. Izražena stališča in mnenja so zgolj stališča in mnenja
			avtorja(-ev) in ni nujno, da odražajo stališča in mnenja Evropske unije ali Evropske
			izvajalske agencije za izobraževanje in kulturo (EACEA). Zanje ne moreta biti odgovorna niti
			Evropska unija niti EACEA.
		</p>
	</div>
</div>

<style>
	.footer {
		width: 100%;
		padding: 4rem 1.5rem 3rem 1.5rem;
	}

	@media screen and (max-width: 767px) {
		.footer {
			width: 100%;
			padding: 3rem 0.5rem 2rem 0.5rem;
		}
	}

	.credits {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.125rem;

		@media screen and (max-width: 767px) {
			flex-direction: column;
		}

		text-align: center;
		padding: 1.5rem;
		border: 2px solid var(--color-black);
		background-color: var(--color-neon-green);
		border-radius: 12px;

		color: var(--color-black);
		font-weight: 500;
		font-size: var(--font-s);
	}

	.credits-link {
		font-weight: 700;
	}

	.support-btn {
		display: flex;
		gap: 0;

		border-radius: 10px;
		background-color: var(--color-white);
		color: var(--color-black);
		padding: 0.25rem 1rem;

		font-size: var(--font-s);
		line-height: var(--lh-l);
		text-decoration: none;
	}

	.donate-container {
		position: relative;
		width: 60px;
		height: var(--lh-l);
	}

	.donate-image {
		position: absolute;
		top: -12px;
		left: 0;
	}

	.info-section {
		width: 100%;
		display: flex;
		padding: 2rem 0;

		@media screen and (max-width: 767px) {
			flex-direction: column;
			padding: 0;
		}

		font-size: var(--font-s);
		color: var(--color-white);
		font-weight: 400;
		text-align: center;

		border-bottom: 1px solid var(--color-neon-green);
	}

	.info-part {
		flex-basis: 100%;
		padding: 0.5rem 0 1rem 0;

		&:first-child {
			border-right: 1px solid var(--color-neon-green);
		}

		& > :first-child {
			margin-bottom: 1rem;
		}

		@media screen and (max-width: 767px) {
			padding: 1rem 0;
			&:first-child {
				border-bottom: 1px solid var(--color-neon-green);
				border-right: none;
			}
		}
	}

	.email-link {
		font-weight: 500;
		color: var(--color-neon-green);
	}

	.privacy-policy {
		display: block;
		font-size: 0.875rem;
		margin-top: 1rem;
	}

	.blok-link {
		font-weight: 700;
		color: var(--color-neon-green);
	}

	.eu-funding {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		@media screen and (max-width: 767px) {
			flex-direction: column;
			align-items: flex-start;
			margin-top: 1rem;
		}

		margin-top: 3rem;
	}

	.eu-image {
		width: fit-content;
		height: 40px;
	}

	.eu-text {
		max-width: 740px;
		font-weight: 400;
		font-size: 0.6875rem;
		line-height: 1rem;
	}
</style>
