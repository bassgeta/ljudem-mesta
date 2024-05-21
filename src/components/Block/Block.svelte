<script lang="ts">
	import { onMount } from 'svelte';
	import airplane from '../../lib/assets/liberation-form/airplane.svg?component';
	import blokovi from '../../lib/assets/liberation-form/blokovi.svg?component';
	import cloud_1 from '../../lib/assets/liberation-form/cloud_1.svg?component';
	import cloud_2 from '../../lib/assets/liberation-form/cloud_2.svg?component';
	import fade_1 from '../../lib/assets/liberation-form/fade_1.svg?component';
	import fade_2 from '../../lib/assets/liberation-form/fade_2.png';
	import fade_3 from '../../lib/assets/liberation-form/fade_3.svg?component';
	import fade_4 from '../../lib/assets/liberation-form/fade_4.png';
	import moon from '../../lib/assets/liberation-form/moon.svg?component';
	import ptice from '../../lib/assets/liberation-form/ptice.svg?component';
	import stars from '../../lib/assets/liberation-form/stars.svg?component';
	import streha from '../../lib/assets/liberation-form/streha.svg?component';
	import tla from '../../lib/assets/liberation-form/tla.svg?component';
	import ufo from '../../lib/assets/liberation-form/ufo.svg?component';
	import vhod from '../../lib/assets/liberation-form/vhod.svg?component';
	import bang from '../../lib/assets/liberation-form/bang.svg?component';
	import bang_bang from '../../lib/assets/liberation-form/bang_bang.svg?component';
	import msg from '../../lib/assets/liberation-form/msg.svg?component';
	import msg_hov from '../../lib/assets/liberation-form/msg_hov.svg?component';

	import { Flats, LockedFlats } from './blocks';
	import {
		fetchApartmentData,
		type Apartment,
		subscribeToApartments,
		applyNewApartment,
		apartmentGrid,
		handleLiberateSubmit
	} from '../../utils/liberation';
	import LiberateForm from '../LiberateForm/LiberateForm.svelte';

	export let onAdd = () => null as any;
	export let fullscreen = false;

	let flats = apartmentGrid([], 4);
	const fades = [fade_4, fade_3, fade_2, fade_1];
	const id = `building-${Math.round(Math.random() * 1000)}`;
	function refreshScroll() {
		requestAnimationFrame(() => {
			const el = document.getElementById(id);
			if (el) el.scrollTop = el.scrollHeight - el.clientHeight;
		});
	}

	onMount(async () => {
		const apartments = await fetchApartmentData();
		flats = apartments;
		refreshScroll();
		subscribeToApartments((app) => {
			flats = applyNewApartment(flats, app);
		});
	});

	let liberatingId: number | null = null;
	function onSelect(id: number) {
		liberatingId = id;
	}

	let added = false;

	function handleSubmit(selectedType: number, message?: string) {
		let id = liberatingId;
		if (id) {
			handleLiberateSubmit(id, selectedType, message)
				.then(() => {
					onAdd();
				})
				.finally(() => {
					added = true;
				});
		}
		liberatingId = null;
		flats = applyNewApartment(flats, {
			...flats.find((flat) => flat.id === id)!,
			apartment_type: selectedType,
			message: message || null,
			state: 'FREE'
		});
		refreshScroll();
	}
	function handleClose() {
		liberatingId = null;
		refreshScroll();
	}

	$: safeFlats = apartmentGrid(flats);
</script>

<div
	class="building-container wip-overflow-hidden"
	class:building-container-fullscreen="{fullscreen}"
	id="{id}">
	{#if liberatingId !== null}
		<LiberateForm handleClose="{handleClose}" handleSubmit="{handleSubmit}" isDone="{added}" />
	{:else}
		<div class="building wip-blur">
			<div class="bg">
				<div class="fade">
					<img src="{fade_4}" alt="background" />
				</div>
				<div class="fade">
					<svelte:component this="{fade_3}" preserveAspectRatio="xMidYMid slice" />
				</div>
				<div class="fade">
					<img src="{fade_2}" alt="background" />
				</div>
				<div class="fade fade_bottom">
					<svelte:component this="{fade_1}" preserveAspectRatio="xMidYMid slice" />
				</div>
				<div class="blokovi">
					<svelte:component this="{blokovi}" />
				</div>
				<div class="forest">
					<svelte:component this="{tla}" />
				</div>
			</div>
			<div class="roof">
				<svelte:component this="{streha}" />
			</div>
			<div class="apartments">
				{#each safeFlats as flat}
					{#if flat.state === 'AIRBNB'}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="apartment locked" on:click="{() => onSelect(flat.id)}">
							<svelte:component
								this="{LockedFlats[(flat.floor * 3 + flat.apartment) % LockedFlats.length]
									?.flat}" />
							<svelte:component this="{bang}" class="bang" />
							<svelte:component this="{bang_bang}" class="bang hov" />
						</div>
					{:else}
						<div class="apartment">
							<svelte:component this="{Flats[flat.apartment_type]?.flat}" />
							{#if flat.message}
								<div class="message">
									<svelte:component this="{msg}" />
									<svelte:component this="{msg_hov}" class="hov" />
									<div class="bubble">{flat.message}</div>
								</div>
							{/if}
						</div>
					{/if}
				{/each}
				<div class="floor">
					<svelte:component this="{vhod}" />
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.building-container {
		position: relative;
		width: 100%;
		height: 70vh;

		overflow: hidden;
		border: 4px solid var(--color-black);
		border-radius: 25px;

		overflow-y: auto;
		& svg {
			display: block;
		}
	}
	.building-container-fullscreen {
		margin-top: 10vh;
		height: 80vh;
	}

	.building {
		position: relative;
	}

	.bg {
		min-height: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		z-index: 0;

		& .fade {
			overflow: hidden;
			&:nth-child(odd) {
				flex-grow: 1;
				display: flex;
				flex-direction: column;

				& img {
					height: 100%;
					object-fit: cover;
					flex-grow: 1;
				}
			}
			& svg {
				height: 110%;
				width: 110%;
				transform: scaleY(1.1);
				transform-origin: top center;
			}

			&.fade_bottom {
				padding-bottom: calc(var(--size) / 8);
			}
		}

		& .forest {
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
		}

		& .blokovi {
			position: absolute;
			left: 0;
			bottom: calc(var(--size) / 2.9);
			right: 0;
		}
	}

	.roof {
		position: relative;
		--width: calc(0.6875 * 100%);
		padding: 0 calc(calc(100% - var(--width)) / 2);
		@media screen and (max-width: 767px) {
			padding: 0 calc(calc(83.5% - var(--width)) / 2);
			padding-top: calc(var(--size) / 5);
		}
		padding-top: 20%;
		box-sizing: border-box;
		width: 100%;
		z-index: 1;
	}
	.apartments {
		position: relative;
		z-index: 1;
		--width: calc(0.625 * 100%);
		padding: 0 calc(calc(100% - var(--width)) / 2);
		@media screen and (max-width: 767px) {
			padding: 0 calc(calc(85% - var(--width)) / 2);
		}
		box-sizing: border-box;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;

		& .floor {
			grid-column: 1 / span 3;
			padding-bottom: calc(var(--size) / 6.9);
		}
	}
	.apartment {
		&.locked {
			cursor: pointer;
		}
		position: relative;
		& .bang {
			--siz: calc(var(--size) / 9);
			width: var(--siz);
			height: var(--siz);
			position: absolute;
			top: 20%;
			left: 50%;
			transform: translateX(-50%);
			transition: opacity 0.2s ease-in-out;
			opacity: 1;
			&.hov {
				opacity: 0;
			}
		}
		& svg .bump {
			transition: transform 0.3s ease-in-out;
		}

		&:hover {
			& svg .bump {
				transform: translateY(calc(-1 * var(--size) / 35));
			}
			--siz: calc(var(--size) / 8.9);
			& .bang {
				opacity: 0;
				&.hov {
					opacity: 1;
				}
			}
		}

		& .message {
			position: absolute;
			bottom: 5%;
			left: 5%;
			--siz: calc(var(--size) / 30);
			width: var(--siz);
			height: var(--siz);
			cursor: pointer;

			& .bubble {
				font-size: 0.8rem;
				z-index: 3;
				opacity: 0;
				transform: translateY(-80%);
				position: absolute;
				left: 0;
				width: min(200px, 70vw);
				padding: 1rem 0.5rem;
				background: var(--color-lime);
				transition:
					opacity 0.2s ease-in-out,
					transform 0.2s ease-in-out;
				pointer-events: none;
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 4%;
					border: 5px solid var(--color-lime);
					border-top-color: transparent;
					border-left-color: transparent;
					transform: translateY(50%) rotate(45deg);
				}
			}

			& svg {
				position: absolute;
				top: 0;
				left: 0;
				width: var(--siz);
				height: var(--siz);
				transition: opacity 0.2s ease-in-out;
				opacity: 1;
				&.hov {
					opacity: 0;
				}
			}
			&:hover {
				& .bubble {
					opacity: 1;
					transform: translateY(-100%);
				}
				& svg {
					opacity: 0;
					&.hov {
						opacity: 1;
					}
				}
			}
		}
	}

	.under-construction {
		font-weight: bold;
		letter-spacing: 0.3rem;
		margin-top: calc(var(--size) / 5);
	}
</style>
