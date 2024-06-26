<script lang="ts">
	import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import mapbox from 'mapbox-gl';
	import { onMount, onDestroy, tick } from 'svelte';
	import clap from '$lib/assets/clap.png';
	import xx from '$lib/assets/xx.png';

	let map: mapbox.Map;
	let mapContainer: HTMLDivElement;

	let lng = 6.224518;
	let lat = 47.213995;
	let zoom = 4;

	const goodCountries = [
		'AUT',
		'NLD',
		'ITA',
		'FRA',
		'DEU',
		'ESP',
		'GBR',
		'USA',
		'CAN',
		'PRT',
		'MYS',
		'JPN',
		'SGP',
		'AUS',
		'TUR',
		'ISL',
		'DNK',
		'CHE',
		'BEL',
		'LUX'
	];

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new mapbox.Map({
			container: mapContainer,
			accessToken:
				'pk.eyJ1IjoibG9ja3AiLCJhIjoiY2s0MXE0azU1MDNtaDNrcnczZDlra2VvciJ9.r6EUZP49b1DR9JVVfxOzIQ',
			style: `mapbox://styles/mapbox/outdoors-v11`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom,
			worldview: 'US'
		});

		map.on('load', function () {
			let hoveredPolygonId: string | null = null;

			map.addLayer(
				{
					id: 'them-good-countries',
					source: {
						type: 'vector',
						url: 'mapbox://mapbox.country-boundaries-v1'
					},

					'source-layer': 'country_boundaries',
					type: 'fill',
					paint: {
						'fill-outline-color': 'black',
						'fill-color': '#ADEA98',
						'fill-opacity': 0.7
					}
				},
				'country-label'
			);

			map.setFilter('them-good-countries', ['in', 'iso_3166_1_alpha_3', goodCountries].flat());

			map.addLayer(
				{
					id: 'terrible-countries',
					source: {
						type: 'vector',
						url: 'mapbox://mapbox.country-boundaries-v1'
					},
					'source-layer': 'country_boundaries',
					type: 'fill',
					paint: {
						'fill-outline-color': 'black',
						'fill-color': '#F19DAA',
						'fill-opacity': 1
					}
				},
				'country-label'
			);

			map.setFilter('terrible-countries', ['!in', 'iso_3166_1_alpha_3', goodCountries].flat());

			map.addLayer({
				id: 'water-overlay-layer',
				source: 'composite',
				'source-layer': 'water',
				type: 'fill',
				minzoom: 0,
				paint: {
					'fill-color': '#8ACCEC',
					'fill-opacity': 1
				}
			});

			map.addLayer(
				{
					id: 'clicked-country',
					source: {
						type: 'vector',
						url: 'mapbox://mapbox.country-boundaries-v1'
					},
					'source-layer': 'country_boundaries',
					type: 'fill',
					paint: {
						'fill-outline-color': 'black',
						'fill-color': '#79FC4C',
						'fill-opacity': 1
					}
				},
				'country-label'
			);

			map.setFilter('clicked-country', ['in', 'iso_3166_1_alpha_3', '']);

			map.addSource('cbs', {
				// country-boundaries-simplified
				type: 'geojson',
				data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
			});

			// The feature-state dependent fill-opacity expression will render the hover effect
			// when a feature's hover state is set to true.
			map.addLayer({
				id: 'state-fills',
				type: 'fill',
				source: 'cbs',
				layout: {},
				paint: {
					'fill-color': '#627BC1',
					'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.1]
				}
			});

			// When the user moves their mouse over the state-fill layer, we'll update the
			// feature state for the feature under the mouse.
			map.on('mousemove', 'state-fills', (e) => {
				if (e.features!.length > 0) {
					if (hoveredPolygonId !== null) {
						map.setFeatureState({ source: 'cbs', id: hoveredPolygonId }, { hover: false });
					}

					hoveredPolygonId = e.features![0].properties!.admin;
					map.setFeatureState({ source: 'cbs', id: hoveredPolygonId! }, { hover: true });

					const countryISO3 = e.features![0].properties!.adm0_a3_is;

					if (countryISO3) {
						map.getCanvas().style.cursor = 'pointer';
					} else {
						map.getCanvas().style.cursor = '';
					}
				}
			});

			// When the mouse leaves the state-fill layer, update the feature state of the
			// previously hovered feature.
			map.on('mouseleave', 'state-fills', () => {
				if (hoveredPolygonId !== null) {
					map.setFeatureState(
						{
							source: 'cbs',
							id: hoveredPolygonId
						},
						{
							hover: false
						}
					);
				}
				hoveredPolygonId = null;
			});

			map.on('click', 'state-fills', (e) => {
				const countryISO3 = e.features![0].properties!.adm0_a3_is;

				if (goodCountries.includes(countryISO3)) {
					map.setFilter('clicked-country', ['in', 'iso_3166_1_alpha_3', countryISO3]);

					const msg = getMessageForCountry(countryISO3);

					if (msg) {
						new mapbox.Popup({ className: 'popup' })
							.setLngLat(e.lngLat)
							.setHTML(`<img class="mapIcon" src="${clap}" />` + msg)
							.addTo(map);
					}
				} else {
					map.setFilter('clicked-country', ['in', 'iso_3166_1_alpha_3', '']);

					const msg = getMessageForBadCountry();
					new mapbox.Popup({ className: 'popup' }).setLngLat(e.lngLat).setHTML(msg).addTo(map);
				}
			});

			map.style.stylesheet.layers.forEach(function (layer) {
				if (layer.type === 'symbol') {
					map.setLayoutProperty(layer.id, 'visibility', 'none');
				}
			});
		});
	});

	onDestroy(() => {
		//   map.remove()
	});

	enum CountryMessages {
		'AUT' = '<a target="_blank" href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Dunaj omejuje število dni za najem</a>',
		'FRA' = '<a target="_blank" href="https://www.thelocal.fr/20230807/paris-increasing-crackdowns-on-airbnb-rentals">Pariz omejuje število dni za najem',
		'DEU' = '<a target="_blank" href="https://www.dw.com/en/airbnb-berlin-court-deals-blow-to-holiday-home-platform/a-68510966">Berlin zopet omejuje Airbnb pogoje.',
		'ITA' = '<a target="_blank" href="https://www.reuters.com/markets/europe/italy-crackdown-targets-1-bln-euros-undeclared-short-term-flat-rental-tax-2023-10-30/">Načrtujejo omejitve na nacionalni ravni',
		'NLD' = '<a target="_blank" href="https://www.justtravelous.com/en/airbnb-amsterdam-regels/">Amsterdam omejuje bivanje prek Airbnbja',
		'PRT' = '<a target="_blank" href="https://www.businessinsider.com/portugal-bans-new-airbnbs-fears-becoming-some-sort-of-disneyland-2023-2">Dovoljenja za Airbnbje niso več izdana',
		'ESP' = '<a target="_blank" href="https://www.nytimes.com/2021/09/22/travel/barcelona-airbnb.html">Najemi zasebnih sob so omejeni v Barceloni',
		'GBR' = '<a target="_blank" href="https://www.theupperkey.com/post/the-rules-and-regulations-of-short-term-letting-in-london">London je omejil število letnih najemov v Airbnbjih',
		'USA' = '<a target="_blank" href="https://www.theguardian.com/us-news/2023/oct/23/new-york-airbnb-crackdown-rules-housing">Konec Airbnbja v New Yorku',
		'CAN' = '<a target="_blank" href="https://www.reuters.com/business/canada-tax-rule-curbs-airbnb-deductions-ease-rental-shortage-2023-11-21/">Omejitve v Montrealu, Torontu, Britanski Kolumbiji',
		'MYS' = '<a target="_blank" href="https://www.business-standard.com/world-news/this-malaysian-island-has-now-banned-airbnb-and-it-isn-t-first-to-do-so-123060600627_1.html">Omejitve v Maleziji',
		'JPN' = '<a target="_blank" href="https://blog.keycafe.com/understanding-japans-short-term-rental-regulations/">Različne omejitve na Japonskem',
		'SGP' = '<a target="_blank" href="https://www.techerati.com/the-stack-archive/cloud/2017/02/07/singapore-rules-airbnb-short-term-rentals-illegal/">Omejitve v Singapurju',
		'AUS' = '<a target="_blank" href="https://www.thestratacollective.com.au/education/crackdown-on-airbnb-holiday-rentals/">Omejitve v Avstraliji',
		'TUR' = '<a target="_blank" href="https://balkaninsight.com/2023/10/11/turkey-imposes-tougher-rules-for-airbnb-rentals/">Omejevanje z dovoljenji v Turčiji',
		'ISL' = '<a target="_blank" href="https://www.loc.gov/item/global-legal-monitor/2016-11-29/iceland-new-home-sharing-law-to-take-effect-january-1-2017/">Islandija ena prvih držav s strogimi omejitvami',
		'DNK' = '<a target="_blank" href="https://hostminded.com/denmark-new-airbnb-regulations/">Omejitve na Danskem',
		'CHE' = '<a target="_blank" href="https://www.srf.ch/news/abstimmung-stadt-luzern-airbnb-wird-in-der-stadt-luzern-deutlich-eingeschraenkt">Stroge omejitve v Lucernu, prav tako Bernu in Ženevi',
		'BEL' = '<a target="_blank" href="https://www.brusselstimes.com/768722/brussels-vs-airbnb-city-authorities-win-legal-battle-to-enforce-tighter-limits">Bruselj v bitki z AirBNB',
		'LUX' = '<a target="_blank" href="https://today.rtl.lu/news/luxembourg/a/2122353.html">Luxemburg začenja z regulacijo'
	}

	function getMessageForCountry(country: string): string | null {
		if (country in CountryMessages) {
			return CountryMessages[country as keyof typeof CountryMessages];
		}

		return null;
	}

	function getMessageForBadCountry(): string {
		return `<img class="mapIcon" src="${xx}" />Ni regulacije.`;
	}
</script>

<div class="map-wrap">
	<div id="state-legend" class="legend">
		<span class="dot" style="background-color: #ADEA98"></span> Države z regulacijo&nbsp;&nbsp;
		<span class="dot" style="background-color: #F19DAA"></span> Države brez regulacije
	</div>
	<div class="map" bind:this="{mapContainer}"></div>
</div>

<style>
	.map-wrap {
		width: 100%;
	}

	.map {
		height: 50vh;
		@media only screen and (max-width: 767px) {
			height: 65vh;
		}
	}

	:global(.mapboxgl-popup-content) {
		font-family: 'Figtree', sans-serif;
		background: var(--color-medium-dark-grey) !important;
		color: var(--text-primary);
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		text-align: center;
		border-radius: 19px;
	}

	:global(
			.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip
		) {
		border-bottom-color: var(--color-medium-dark-grey);
	}
	:global(
			.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip
		) {
		border-top-color: var(--color-medium-dark-grey);
	}
	:global(.mapboxgl-popup-anchor-left .mapboxgl-popup-tip) {
		border-right-color: var(--color-medium-dark-grey);
	}
	:global(.mapboxgl-popup-anchor-right .mapboxgl-popup-tip) {
		border-left-color: var(--color-medium-dark-grey);
	}
	:global(.mapboxgl-popup-close-button) {
		display: none;
	}
	:global(.mapIcon) {
		width: 60px;
		height: 50px;
		display: block;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 0.25rem;
	}
	:global(.dot) {
		height: 13px;
		width: 13px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
	}
	:global(.legend) {
		padding: 5px;
		font-size: 15px;
	}
</style>
