<script lang="ts">
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import type Point from '@arcgis/core/geometry/Point';
	import '@esri/calcite-components/dist/calcite/calcite.css';
	import { onMount } from 'svelte';

	let arcgisMap: HTMLArcgisMapElement | null = null;
	let center: Point;
	let mounted = false;
	let selectedItem: HTMLCalciteDropdownItemElement | null = null;
	let selectedItems: HTMLCalciteDropdownItemElement[] = [];

	$: latitude = center?.latitude.toFixed(2);
	$: longitude = center?.longitude.toFixed(2);

	onMount(async () => {
		await import('@arcgis/map-components/dist/components/arcgis-map');
		await import('@esri/calcite-components/dist/components/calcite-action');
		await import('@esri/calcite-components/dist/components/calcite-action-bar');
		await import('@esri/calcite-components/dist/components/calcite-button');
		await import('@esri/calcite-components/dist/components/calcite-dropdown');
		await import('@esri/calcite-components/dist/components/calcite-dropdown-group');
		await import('@esri/calcite-components/dist/components/calcite-dropdown-item');
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
		center = (event.target as HTMLArcgisMapElement).center;
	}

	function handleArcgisViewReadyChange(event: CustomEvent) {
		arcgisMap = event.target as HTMLArcgisMapElement;
	}

	function handleOnCalciteDropdownSelect(event: { target: HTMLCalciteDropdownElement }) {
		if (event.target) {
			selectedItems = event.target.selectedItems;

			selectedItems.forEach(async (item) => {
				switch (item.id) {
					case 'arcgis-area-measurement-2d':
						await import('@arcgis/map-components/dist/components/arcgis-area-measurement-2d');
						break;
					case 'arcgis-basemap-gallery':
						await import('@arcgis/map-components/dist/components/arcgis-basemap-gallery');
						break;
					case 'arcgis-layer-list':
						await import('@arcgis/map-components/dist/components/arcgis-layer-list');
						break;
					case 'arcgis-legend':
						await import('@arcgis/map-components/dist/components/arcgis-legend');
						break;
					default:
						break;
				}
			});
		}
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
			<calcite-dropdown
				close-on-select-disabled
				on:calciteDropdownSelect={handleOnCalciteDropdownSelect}
				slot="content-end"
			>
				<calcite-button slot="trigger">Select Components</calcite-button>
				<calcite-dropdown-group selection-mode="multiple">
					<calcite-dropdown-item
						icon-start="measure-area"
						id="arcgis-area-measurement-2d"
						label="Area Measurement 2D">Area Measurement 2D</calcite-dropdown-item
					>
					<calcite-dropdown-item
						icon-start="basemap"
						id="arcgis-basemap-gallery"
						label="Basemap Gallery">Basemap Gallery</calcite-dropdown-item
					>
					<calcite-dropdown-item icon-start="layers" id="arcgis-layer-list" label="Layer List"
						>Layer List</calcite-dropdown-item
					>
					<calcite-dropdown-item icon-start="legend" id="arcgis-legend" label="Legend"
						>Legend</calcite-dropdown-item
					>
				</calcite-dropdown-group>
			</calcite-dropdown>
		</calcite-navigation>
		<calcite-shell-panel slot="panel-start" position="start">
			<calcite-action-bar slot="action-bar">
				{#each selectedItems as item, index}
					<calcite-action
						on:click={() => (selectedItem = selectedItems[index])}
						on:keypress={() => (selectedItem = selectedItems[index])}
						tabindex="0"
						role="button"
						active={item.id === selectedItem?.id ? true : undefined}
						icon={item.iconStart}
						text={item.label}
					/>
				{/each}
			</calcite-action-bar>
			{#if selectedItem?.id === 'arcgis-area-measurement-2d'}
				<arcgis-area-measurement-2d reference-element="arcgis-map"></arcgis-area-measurement-2d>
			{:else if selectedItem?.id === 'arcgis-basemap-gallery'}
				<arcgis-basemap-gallery reference-element="arcgis-map"></arcgis-basemap-gallery>
			{:else if selectedItem?.id === 'arcgis-layer-list'}
				<arcgis-layer-list reference-element="arcgis-map"></arcgis-layer-list>
			{:else if selectedItem?.id === 'arcgis-legend'}
				<arcgis-legend reference-element="arcgis-map"></arcgis-legend>
			{/if}
		</calcite-shell-panel>
		<arcgis-map
			item-id="d5dda743788a4b0688fe48f43ae7beb9"
			on:arcgisViewChange={handleArcgisViewChange}
			on:arcgisViewReadyChange={handleArcgisViewReadyChange}
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
