<script lang="ts">
	import { register, type SwiperContainer } from 'swiper/element/bundle';
	import ArrowShort from '$lib/assets/icons/arrow-short.svelte';
	import { onMount } from 'svelte';
	import { SHEET_ID } from '../../constants/testimonials';
	import TestimonialCard from './blocks/TestimonialCard.svelte';

	register();

	let testimonials: string[] = [];
	let swiperEl: SwiperContainer | undefined;

	interface SheetsRow {
		c: Array<{ v: string; f: string }>;
	}

	function extractTestmonials(rows: SheetsRow[]) {
		testimonials = rows.map((i) => i.c[0].v);
	}

	function handlePreviousClick() {
		swiperEl?.swiper?.slidePrev();
	}

	function handleNextClick() {
		swiperEl?.swiper?.slideNext();
	}

	async function fetchTestimonials() {
		const sheetUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&tq&gid=0`;

		try {
			const response = await fetch(sheetUrl);
			const data = await response.text();
			const jsonContent = JSON.parse(data.substring(47).slice(0, -2));

			extractTestmonials(jsonContent?.table?.rows ?? []);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function initiateSwiper() {
		if (!swiperEl) {
			return;
		}

		const swiperParams = {
			slidesPerView: 1.1,
			spaceBetween: 16,
			breakpoints: {
				1024: {
					slidesPerView: 1.5
				}
			}
		};

		Object.assign(swiperEl, swiperParams);

		swiperEl.initialize();
	}

	onMount(async () => {
		await fetchTestimonials();
		initiateSwiper();
	});
</script>

<div class="testimonials-container">
	<div class="pagination">
		<button class="pagination-btn previous-arrow" on:click="{handlePreviousClick}">
			<ArrowShort />
		</button>
		<button class="pagination-btn" on:click="{handleNextClick}">
			<ArrowShort />
		</button>
	</div>
	<swiper-container bind:this="{swiperEl}" init="false">
		{#each testimonials as testimonial}
			<swiper-slide class="slide">
				<TestimonialCard testimonial="{testimonial}" />
			</swiper-slide>
		{/each}
	</swiper-container>
</div>

<style>
	.slide {
		width: 100%;
		&:nth-child(even) > div {
			& > div:first-child {
				background-color: var(--color-green);
			}
			& > div:nth-child(2) {
				border-color: var(--color-green) transparent transparent transparent;

			}
		}
	}

	.testimonials-container {
		width: 100%;
	}

	.pagination {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.pagination-btn {
		width: 48px;
		height: 48px;
		border-radius: 100%;
		background-color: var(--color-white);
		color: var(--color-black);

		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.previous-arrow {
		transform: rotate(180deg);
	}
</style>
