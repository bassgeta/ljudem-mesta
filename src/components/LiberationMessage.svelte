<script lang="ts">
	import Message from '$lib/assets/icons/message.svelte';

	export let message = '';

	let container;
	let isExpanded = false;

	function onWindowClick(e) {
		if (container.contains(e.target) === false) isExpanded = false;
	}

	function onBubbleClick(newExpanded: boolean) {
		isExpanded = newExpanded;
	}
</script>

<svelte:window on:click="{onWindowClick}" />

<button
	bind:this="{container}"
	class="message-wrapper"
	on:click="{() => onBubbleClick(!isExpanded)}">
	{#if !isExpanded}
		<Message />
	{:else}
		<div class="message-bubble">
			{message}
		</div>
	{/if}
</button>

<style>
	.message-wrapper {
		position: absolute;
		z-index: 1;
		bottom: 1rem;
		left: 1rem;
	}

	/* temporary */
	.message-bubble {
		border: 1px solid black;
		padding: 1rem;
		background-color: white;
		font-size: 1rem;
	}
</style>
