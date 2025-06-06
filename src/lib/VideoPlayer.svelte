<script lang="ts">
	import VideoLayer from '@arcgis/core/layers/VideoLayer';
	import { onMount } from 'svelte';

	let { referenceElement } = $props();

	let mounted = $state(false);
	let videoPlayer: HTMLArcgisVideoPlayerElement | null = $state(null);

	const layer = new VideoLayer({
		autoplay: true,
		url: 'https://dev000276.esri.com/video/rest/services/cheyenne1/VideoServer/0'
	});

	onMount(async () => {
		await import('@arcgis/map-components/components/arcgis-video-player');
		await import('@esri/calcite-components/components/calcite-button');

		await layer.load();
		referenceElement?.map.layers.add(layer);
		referenceElement?.goTo(layer.fullExtent);

		mounted = true;
	});
</script>

{#if mounted}
	<arcgis-video-player
		bind:this={videoPlayer}
		data-testid="arcgis-video-player-component"
		{layer}
		{referenceElement}
	></arcgis-video-player>
{:else}
	<p>Loading...</p>
{/if}
