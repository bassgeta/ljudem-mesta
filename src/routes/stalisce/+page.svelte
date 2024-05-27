<script lang="ts">
	import { _ } from 'svelte-i18n';
	import stalisceImg from '$lib/assets/figure/stalisce.png';
	import msg from '../../lib/assets/liberation-form/msg.svg?component';
	import download from '../../lib/assets/icons/download.svg?component';
	import hat from '../../lib/assets/figure/Hat.png';
	import Nalepka from '../../components/Nalepka.svelte';
	import Arrow from '$lib/assets/icons/arrow.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<svelte:head>
	<title>{$_('position.head.title')}</title>
</svelte:head>

<div class="position-page">
	<div class="heading">
		<h1>Airbnb, pejt domov!</h1>

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
		<div class="stalisce-nalepka">
			<Nalepka />
		</div>
		<h2>
			<div class="icon"><img src="{hat}" /></div>
			KAKO LAHKO ZAKON ŠE IZBOLJŠAMO?
		</h2>
		<div class="info-card info-card-stalisce">
			<div class="info-card-body">
				<h3>
					Oddaja v kratkotrajni najem naj se zameji na fizične osebe s prijavljenim stalnim
					prebivališčem na naslovu nepremičnine za kratkotrajni najem.
				</h3>
				<p>
					Predlog zakona v trenutni obliki ne naslavlja problematičnosti naložb za oddajo, ki
					zajedajo trg dolgotrajnega najema. Kratkoročni najem predstavlja priložnost za velike
					zaslužke, posledično pa gre velikokrat za trajno gospodarsko aktivnost. Obenem trenutni
					predlog zakona, ki ne zamejuje kratkotrajnega najema na fizične osebe, ki v stanovanju
					tudi prebivajo, vzbuja skrb, da bodo najemodajalci v turističnih krajih sklepali najemne
					pogodbe le za toliko dni v letu oziroma tiste dni v letu, ko ne bodo imeli možnosti
					oddajati turistom.
				</p>
				<p>
					Zato predlagamo, da lahko v kratkotrajni najem oddajajo samo fizične osebe, ki stalno
					prebivajo na naslovu nepremičnine za kratkotrajni najem. Posamezniki, ki želijo oddajati
					za daljše obdobje in/ali nimajo prijavljenega prebivališča na naslovu te nepremičnine, bi
					se v tem primeru obravnavali kot komercialni ponudniki in bi se morali tudi ustrezno
					registrirati.
				</p>
			</div>
		</div>
		<div class="info-card info-card-stalisce">
			<div class="info-card-body">
				<h3>
					Potrebno je omogočiti tako zaostritev pogojev za kratkotrajni najem s strani občine kot
					tudi povečanje varovalk glede sproščanja pogojev s strani občine.
				</h3>
				<p>
					Omogočanje zaostritve pogojev s strani občine je ključna za nekatere najbolj problematične
					lokacije v Sloveniji. Z možnostjo zaostritve pogojev bi namreč občini omogočili, da lahko
					recimo omeji odstotek stanovanj, ki so namenjena kratkoročnemu najemu na določenih
					lokacijah, ali pa prepove oddajo parkirnega mesta v večstanovanjski stavbi. S tem bi zakon
					še bolje naslovil raznolike in specifične problematike kratkotrajnega najema.
				</p>
				<p>
					Dodatne varovalke glede sproščanja pogojev so potrebne, da bi zmanjšali vpliv različnih
					interesnih skupin na župane oziroma občinske svete. Predlagamo, da je analiza
					sprejemljivih sprememb obvezna za rahljanje pogojev, obenem pa se vanjo kot obvezno
					vključi tudi oceno učinka na najemni trg v občini. Izvedba takšne analize je ključna za
					strokovno in objektivno odločitev v primeru podaljšanja časovnega razpona oddaje, ki lahko
					pomembno vpliva na najemni trg v občini, kot tudi obremenitev lokalne infrastrukture.
				</p>
			</div>
		</div>
		<div class="info-card info-card-stalisce">
			<div class="info-card-body">
				<h3>Za uspešnost zakona je ključno okrepiti izvajanje politike in nadzor.</h3>
				<p>
					Omejevanje kratkotrajnega najema stanovanj je lahko dober ukrep samo, če se bo ustrezno
					izvajal in nadziral.
				</p>

				<p>Zato je potrebno:</p>
				<ul>
					<li>okrepiti delo občinskih inšpekcij s podporo tržnega inšpektorata,</li>
					<li>vzpostaviti sistem anonimne prijave kršitev,</li>
					<li>vzpostaviti mehanizem, ki omogoča preverbo opravljanja dejavnosti v stanovanjih,</li>
					<li>
						vzpostaviti kazenske določbe za fizične osebe, ki v kratkotrajni najem oddajajo na črno.
					</li>
				</ul>
			</div>
		</div>
		<div class="info-card info-card-stalisce">
			<div class="info-card-body">
				<h3>Ponudnike naj se zaveže k objavi identifikacijske številke v oglasih.</h3>
				<p>
					Zakon ne ureja obveznosti javne objave identifikacijske številke nastanitvenega prostora
					na platformah za kratkotrajni najem oziroma v drugih oblikah oglaševanja stanovanj v
					turistične namene (recimo mali oglasi, družbenomedijske platforme, kot so Facebook,
					Instagram in podobno). Brez te obveze za ponudnike kratkotrajnega najema bo težko
					zagotoviti, da se bodo identifikacijske številke dejansko objavljale, s tem pa bo izjemno
					oteženo izvajanje nadzora.
				</p>
				<p>
					Zato predlagamo, da se ponudnike zaveže, da kratkotrajni najem oglašujejo z obvezno objavo
					identifikacijske številke. Obenem naj se doda se tudi kazenske določbe za primere, ko
					ponudniki oglašujejo brez identifikacijske številke.
				</p>
			</div>
		</div>
		<div class="info-card info-card-stalisce">
			<div class="info-card-body">
				<h3>
					Potrebno je odpraviti nejasnosti glede opredelitve pojmov sobodajalec in ponudnik
					kratkotrajnega najema.
				</h3>
				<p>
					Zaradi oblice nejasnosti predlagamo, da zakon uvede različna poimenovanja za različne
					opredelitve in se s tem jasno razloči pravne subjekte od fizičnih oseb, kot tudi pravni
					status od izvajanja dejavnosti.
				</p>
				<p>
					Zaradi ustaljenosti izraza sobodajalec, ki je že uvedena tudi v drugi zakonodaji,
					predlagamo, da se izraz sobodajalec ohrani za fizično osebo, ki opravlja dejavnost.
					Aktivnost izvajanja dejavnosti v stanovanju pa naj bo poimenovano z novo uvedenim izrazom
					ponudnik kratkotrajnega najema, ki lahko velja tako za fizično osebo kot za pravni
					subjekt.
				</p>
			</div>
		</div>
		<div class="info-card info-card-stalisce">
			<div class="info-card-body">
				<h3>
					Natančneje naj se opredelijo vrste nastanitvenih obratov, omejitve v registracijskem
					postopku, odtegnitev soglasja etažnih lastnikov, obenem pa naj se spremeni število ležišč
					v večstanovanjski stavbi iz 6 na 4.
				</h3>
			</div>
		</div>
		<div class="info-card info-card-comment">
			<div class="info-card-body">
				<div>
					<h3>TUDI TI LAHKO ODDAŠ KOMENTAR NA PREDLOG ZAKONA!</h3>
					<p>
						Naj glas zagovornikov stožje regulacije kratkotrajnega najema doseže tudi odločevalce.
						Vsakdo lahko odda komentar na predlog zakona na portalu eDemokracija. Vse, kar moraš
						storiti je, da oblikuješ svoj predlog ali pa preprosto skopiraš naš komentar!
					</p>
				</div>
				<div class="stalisce-bubble">
					<img src="{stalisceImg}" />
				</div>
			</div>
		</div>

		<div class="call-to-action">
			<a
				class="shadowed-card shadowed-button stalisce-btn dokument"
				target="_blank"
				href="https://drive.google.com/file/d/1z7HFbnPKXfNZ0qdeKF3frCM_fj2ZmWEo/view?usp=sharing">
				<div class="icon">
					<svelte:component this="{download}" />
				</div>
				Prenesi dokument s celotnim komentarjem
			</a>
			<a
				class="shadowed-card shadowed-button stalisce-btn portal"
				target="_blank"
				href="https://e-uprava.gov.si/storitve/pripraviObrazec.esju?id=2024&dokument=215582">
				<div class="icon">
					<svelte:component this="{msg}" />
				</div>
				Obišči portal eDemokracija in oddaj komentar!
				<Arrow />
			</a>
		</div>
	</div>
</div>

<Footer />

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
		max-width: 60%;

		display: flex;
		gap: 2.375rem;

		& .icon {
			width: 132px;
			height: 132px;
			background: white;
			border-radius: 50%;

			& img {
				width: 132px;
				transform: translateX(-30%);
			}
		}

		@media screen and (max-width: 767px) {
			max-width: 100%;
			flex-direction: column;
			gap: 1rem;
		}
	}

	.content {
		padding: 0 108px;
		padding-top: 4rem;
		padding-bottom: 6.625rem;
		background: var(--color-lime);
		color: black;
		margin: 0 calc(-1 * var(--hpadding));
		position: relative;
		@media screen and (max-width: 767px) {
			padding: 32px;
		}
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

	.call-to-action {
		margin-top: 4.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.625rem;
		& a {
			padding: 0.625rem 0.8125rem;
		}
		& .icon {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: white;
			display: flex;
			position: relative;
			flex-shrink: 0;

			& svg {
				height: 25px;
				width: 25px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		& .dokument {
			background: var(--color-pastel-green);
		}

		& .portal {
			background: var(--color-neon-green);
		}
	}

	.stalisce-nalepka {
		z-index: 2;
		position: absolute;
		top: -7rem;
		right: 1rem;
		@media screen and (max-width: 767px) {
			top: -3rem;
		}
	}

	.info-card-stalisce {
		&:nth-child(odd) {
			margin-right: 2rem;
		}
		&:nth-child(even) {
			margin-left: 2rem;
		}
		@media screen and (max-width: 767px) {
			margin: 0;
			margin-bottom: 1rem;
			padding: 0;
			&:nth-child(odd) {
				margin-right: 0;
			}
			&:nth-child(even) {
				margin-left: 0;
			}
		}

		& h3 {
			font-size: 24px;
			font-weight: 700;
			line-height: 28px;
			margin-bottom: 0.5rem;
		}

		& p,
		& ul {
			font-size: 21px;
			font-weight: 500;
			line-height: 28px;
			margin-bottom: 0.5rem;
		}
	}
</style>
