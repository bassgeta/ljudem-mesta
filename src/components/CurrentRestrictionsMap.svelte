<script lang="ts">
	import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import mapbox from 'mapbox-gl';
	import { onMount, onDestroy, tick } from 'svelte';

	let map: mapbox.Map;
	let mapContainer: HTMLDivElement;

	let lng = 6.224518;
	let lat = 47.213995;
	let zoom = 4;

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
						'fill-color': 'var(--color-dark-grey)fff',
						'fill-opacity': 0.7
					}
				},
				'country-label'
			);

			map.setFilter('them-good-countries', [
				'in',
				'iso_3166_1_alpha_3',
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
				'AUS'
			]);

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
						'fill-color': 'grey',
						'fill-opacity': 1
					}
				},
				'country-label'
			);

			map.setFilter('terrible-countries', [
				'!in',
				'iso_3166_1_alpha_3',
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
				'SVN'
			]);

			map.addLayer(
				{
					id: 'slovenialool',
					source: {
						type: 'vector',
						url: 'mapbox://mapbox.country-boundaries-v1'
					},
					'source-layer': 'country_boundaries',
					type: 'fill',
					paint: {
						'fill-outline-color': 'black',
						'fill-color': '#ffd700',
						'fill-opacity': 1
					}
				},
				'country-label'
			);

			map.setFilter('slovenialool', ['==', 'iso_3166_1_alpha_3', 'SVN']);

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

					const msg = getMessageForCountry(countryISO3);

					if (msg) {
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

				const msg = getMessageForCountry(countryISO3);

				if (msg) {
					new mapbox.Popup({ className: 'popup' }).setLngLat(e.lngLat).setHTML(msg).addTo(map);
				}
			});
		});
	});

	onDestroy(() => {
		//   map.remove()
	});

	enum CountryMessages {
		'AUT' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Dunaj omejuje število dni za najem</a>',
		'FRA' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Pariz omejuje število dni za najem',
		'DEU' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Berlin je predhodno uvedel prepoved Airbnb. Ta je zdaj odpravljena, vendar ostajajo stroga pravila - uveljavljajo se z visokimi kaznimi.',
		'ITA' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Načrtujejo omejitve na nacionalni ravni',
		'NLD' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Amsterdam omejuje bivanje prek Airbnbja',
		'PRT' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Dovoljenja za Airbnbje niso več izdana',
		'ESP' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Najemi zasebnih sob so omejeni v Barceloni',
		'GBR' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">London je omejil število letnih najemov v Airbnbjih',
		'USA' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Konec Airbnbja v New Yorku',
		'CAN' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Omejitve v Montrealu, Torontu, Britanski Kolumbiji',
		'MYS' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Omejitve v Maleziji',
		'JPN' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Omejitve na Japonskem',
		'SGP' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Omejitve v Singapurju',
		'AUS' = '<a href="https://www.thelocal.at/20230822/vienna-tightens-airbnb-and-other-rules-for-short-term-tourist-rentals">Omejitve v Avstraliji'
	}

	function getMessageForCountry(country: string): string | null {
		if (country in CountryMessages) {
			return CountryMessages[country as keyof typeof CountryMessages];
		}

		return null;
	}
</script>

<div class="map-wrap">
	<div class="map" bind:this="{mapContainer}"></div>
</div>

<style>
	.map-wrap {
		width: 100%;
		padding: 1.5rem;
	}

	.map {
		height: 40vh;
	}

	:global(.mapboxgl-popup-content) {
		background: var(--color-dark-grey) !important;
		color: var(--text-primary);
		border-radius: 19px;
	}

	:global(
			.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip
		) {
		border-bottom-color: var(--color-dark-grey);
	}
	:global(
			.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
			.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip
		) {
		border-top-color: var(--color-dark-grey);
	}
	:global(.mapboxgl-popup-anchor-left .mapboxgl-popup-tip) {
		border-right-color: var(--color-dark-grey);
	}
	:global(.mapboxgl-popup-anchor-right .mapboxgl-popup-tip) {
		border-left-color: var(--color-dark-grey);
	}
</style>
