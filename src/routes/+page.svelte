<script lang="ts">
	import type { Widget } from '$lib/types';
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import type Point from '@arcgis/core/geometry/Point';
	import type { ArcgisMap } from '@arcgis/map-components/dist/components/arcgis-map';
	import '@esri/calcite-components/dist/calcite/calcite.css';
	import { onMount } from 'svelte';

	const widgets: Widget[] = [
		{
			icon: 'layers',
			id: 'arcgis-layer-list',
			text: 'Layer List'
		},
		{
			icon: 'legend',
			id: 'arcgis-legend',
			text: 'Legend'
		}
	];

	let arcgisMap: ArcgisMap | null = null;
	let activeWidget = widgets[0];
	let center: Point;
	let mounted = false;

	$: latitude = center?.latitude.toFixed(2);
	$: longitude = center?.longitude.toFixed(2);

	onMount(async () => {
		await import('@arcgis/map-components/dist/components/arcgis-layer-list');
		await import('@arcgis/map-components/dist/components/arcgis-legend');
		await import('@arcgis/map-components/dist/components/arcgis-map');
		await import('@esri/calcite-components/dist/components/calcite-action');
		await import('@esri/calcite-components/dist/components/calcite-action-bar');
		await import('@esri/calcite-components/dist/components/calcite-navigation');
		await import('@esri/calcite-components/dist/components/calcite-navigation-logo');
		await import('@esri/calcite-components/dist/components/calcite-shell');
		await import('@esri/calcite-components/dist/components/calcite-shell-center-row');
		await import('@esri/calcite-components/dist/components/calcite-shell-panel');

		const { setAssetPath } = await import('@esri/calcite-components/dist/components');
		setAssetPath('https://js.arcgis.com/calcite-components/2.10.1/assets');

		mounted = true;
	});

	function handleArcgisViewChange(event: CustomEvent) {
		center = (event.target as ArcgisMap).center;
	}

	function handleArcgisViewReadyChange(event: CustomEvent) {
		arcgisMap = event.target as ArcgisMap;
	}
</script>

{#if mounted}
	<calcite-shell>
		<calcite-navigation slot="header">
			<calcite-navigation-logo
				description={arcgisMap?.map.portalItem.snippet}
				heading={arcgisMap?.map.portalItem.title}
				slot="logo"
				thumbnail={arcgisMap?.map.portalItem.thumbnailUrl}
				href={arcgisMap?.map.portalItem.itemPageUrl}
				label="Thumbnail of map"
			/>
		</calcite-navigation>
		<calcite-shell-panel slot="panel-start" position="start">
			<calcite-action-bar slot="action-bar">
				{#each widgets as widget}
					<calcite-action
						on:click={() => (activeWidget = widget)}
						on:keypress={() => (activeWidget = widget)}
						tabindex="0"
						role="button"
						active={widget.id === activeWidget.id ? true : undefined}
						icon={widget.icon}
						text={widget.text}
					/>
				{/each}
			</calcite-action-bar>
			{#if activeWidget.id === 'arcgis-layer-list'}
				<arcgis-layer-list reference-element="arcgis-map" />
			{:else if activeWidget.id === 'arcgis-legend'}
				<arcgis-legend reference-element="arcgis-map" />
			{/if}
		</calcite-shell-panel>
		<arcgis-map
			item-id="d5dda743788a4b0688fe48f43ae7beb9"
			on:arcgisViewChange={handleArcgisViewChange}
			on:arcgisViewReadyChange={handleArcgisViewReadyChange}
			ref={arcgisMap}
		></arcgis-map>
		{#if center}
			<shell-center-row>
				<div>
					Map Center: {longitude}° longitude {latitude}° latitude
				</div>
			</shell-center-row>
		{/if}
	</calcite-shell>
{:else}
	<p>Loading...</p>
{/if}

<style>
	arcgis-map {
		flex: 1;
	}
</style>
