<script lang="ts">
	import Message from '$lib/assets/icons/message.svelte';

	export let message = '';

	let container;
	let isExpanded = false;

	function onWindowClick(e) {
		console.log('opa brtonja', e, container);
		if (container.contains(e.target) == false) isExpanded = false;
	}

	function onBubbleClick(newExpanded: boolean) {
		console.log('handling baton klik', { isExpanded, newExpanded });
		isExpanded = newExpanded;
	}
	$: console.log('expand dong', isExpanded);
</script>

<svelte:window on:click="{onWindowClick}" />

<button
	bind:this="{container}"
	class="message-wrapper"
	on:click|stopPropagation="{() => onBubbleClick(!isExpanded)}">
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
