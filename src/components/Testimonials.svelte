<script lang="ts">
	import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';
	import { SHEET_ID } from '../constants/testimonials';

	register();
	let testimonials: string[] = [];

	interface SheetsRow {
		c: Array<{ v: string; f: string }>;
	}

	function extractTestmonials(rows: SheetsRow[]) {
		testimonials = rows.map((i) => i.c[0].v);
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

	onMount(async () => {
		await fetchTestimonials();
	});

	console.log('testi', testimonials);
</script>

<div class="testimonials-container">
	<swiper-container slides-per-view="{1}" class="slide" navigation="true">
		{#each testimonials as testimonial}
			<swiper-slide class="slide">
				<div class="info-card testimonial-card">
					<div class="info-card-body">
						{testimonial}
					</div>
				</div>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>

<style>
	.slide {
		width: 100%;
	}
	.testimonials-container {
		width: 100%;
	}
	.testimonial-card {
		width: 100%;
		background-color: var(--color-lime);
		color: var(--color-black);
	}
</style>
