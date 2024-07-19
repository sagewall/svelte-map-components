<script lang="ts">
	import type Point from '@arcgis/core/geometry/Point';
	import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
	import type Layer from '@arcgis/core/layers/Layer';
	import type LayerView from '@arcgis/core/views/layers/LayerView';
	import { onMount } from 'svelte';

	let arcgisMapComponent: HTMLArcgisMapElement | null = null;
	let center: Point;
	let censusTrackLayer: FeatureLayer;
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

		mounted = true;
	});

	function handleArcgisReadyEditor() {
		const featureLayerIds = arcgisMapComponent?.layerViews.map((layerView: LayerView) => {
			if (layerView.layer.type === 'feature') {
				return (layerView.layer as FeatureLayer).portalItem.id;
			}
		});

		const editableLayerIds = [
			'7252a8de226f4b039169b4a85ec5f1a6',
			'fa80bf61cd6349809c5bcab757ad4873',
			'1eb67a37df674ed9857ffdf4113eff8e'
		];

		editableLayerIds.forEach((id) => {
			if (!featureLayerIds.includes(id)) {
				arcgisMapComponent?.addLayer(new FeatureLayer({ portalItem: { id } }));
			}
		});
	}

	async function handleArcgisReadyScaleRangeSlider(event: {
		target: HTMLArcgisScaleRangeSliderElement;
	}) {
		event.target.layer = censusTrackLayer;
	}

	function handleArcgisReadyTableList() {
		const featureLayerIds = arcgisMapComponent?.map.layers.map((layer: Layer) => {
			if (layer.type === 'feature') {
				return (layer as FeatureLayer).portalItem.id;
			}
		});

		const tableLayerIds = ['6aa49be79248400ebd28f1d0c6af3f9f'];

		tableLayerIds.forEach(async (id) => {
			if (!featureLayerIds?.includes(id)) {
				const table = new FeatureLayer({ portalItem: { id } });
				await table.load();
				arcgisMapComponent?.map.tables.add(table);
			}
		});
	}

	async function handleArcgisReadyTimeSlider(event: { target: HTMLArcgisTimeSliderElement }) {
		const featureLayerUrls = arcgisMapComponent?.map.layers.map((layer: Layer) => {
			if (layer.type === 'feature') {
				return (layer as FeatureLayer).url;
			}
		});

		const url =
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/0';

		if (!featureLayerUrls?.includes(url)) {
			const featureLayer = new FeatureLayer({ url });
			arcgisMapComponent?.addLayer(featureLayer);

			await featureLayer.load();
			event.target.fullTimeExtent = featureLayer.timeInfo.fullTimeExtent;
			event.target.stops = {
				interval: featureLayer.timeInfo.interval
			};
		}
	}

	function handleArcgisViewChange(event: CustomEvent) {
		center = (event.target as HTMLArcgisMapElement).center;
	}

	function handleArcgisViewReadyChange(event: CustomEvent) {
		arcgisMapComponent = event.target as HTMLArcgisMapElement;

		censusTrackLayer = arcgisMapComponent.map.layers.find(
			(layer: Layer) => layer.title === 'Census Tracts'
		) as FeatureLayer;
	}

	function handleOnCalciteDropdownSelect(event: { target: HTMLCalciteDropdownElement }) {
		if (event.target) {
			selectedItems = event.target.selectedItems;

			selectedItems.forEach(async (item) => {
				switch (item.dataset.component) {
					case 'arcgis-area-measurement-2d':
						await import('@arcgis/map-components/dist/components/arcgis-area-measurement-2d');
						break;
					case 'arcgis-basemap-gallery':
						await import('@arcgis/map-components/dist/components/arcgis-basemap-gallery');
						break;
					case 'arcgis-basemap-layer-list':
						await import('@arcgis/map-components/dist/components/arcgis-basemap-layer-list');
						break;
					case 'arcgis-basemap-toggle':
						await import('@arcgis/map-components/dist/components/arcgis-basemap-toggle');
						break;
					case 'arcgis-bookmarks':
						await import('@arcgis/map-components/dist/components/arcgis-bookmarks');
						break;
					case 'arcgis-compass':
						await import('@arcgis/map-components/dist/components/arcgis-compass');
						break;
					case 'arcgis-coordinate-conversion':
						await import('@arcgis/map-components/dist/components/arcgis-coordinate-conversion');
						break;
					case 'arcgis-directional-pad':
						await import('@arcgis/map-components/dist/components/arcgis-directional-pad');
						break;
					case 'arcgis-directions':
						await import('@arcgis/map-components/dist/components/arcgis-directions');
						break;
					case 'arcgis-distance-measurement-2d':
						await import('@arcgis/map-components/dist/components/arcgis-distance-measurement-2d');
						break;
					case 'arcgis-editor':
						await import('@arcgis/map-components/dist/components/arcgis-editor');
						break;
					case 'arcgis-home':
						await import('@arcgis/map-components/dist/components/arcgis-home');
						break;
					case 'arcgis-layer-list':
						await import('@arcgis/map-components/dist/components/arcgis-layer-list');
						break;
					case 'arcgis-legend':
						await import('@arcgis/map-components/dist/components/arcgis-legend');
						break;
					case 'arcgis-locate':
						await import('@arcgis/map-components/dist/components/arcgis-locate');
						break;
					case 'arcgis-print':
						await import('@arcgis/map-components/dist/components/arcgis-print');
						break;
					case 'arcgis-scale-bar':
						await import('@arcgis/map-components/dist/components/arcgis-scale-bar');
						break;
					case 'arcgis-scale-range-slider':
						await import('@arcgis/map-components/dist/components/arcgis-scale-range-slider');
						break;
					case 'arcgis-search':
						await import('@arcgis/map-components/dist/components/arcgis-search');
						break;
					case 'arcgis-sketch':
						await import('@arcgis/map-components/dist/components/arcgis-sketch');
						break;
					case 'arcgis-table-list':
						await import('@arcgis/map-components/dist/components/arcgis-table-list');
						break;
					case 'arcgis-time-slider':
						await import('@arcgis/map-components/dist/components/arcgis-time-slider');
						break;
					case 'arcgis-track':
						await import('@arcgis/map-components/dist/components/arcgis-track');
						break;
					case 'arcgis-zoom':
						await import('@arcgis/map-components/dist/components/arcgis-zoom');
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
				description={arcgisMapComponent?.map.portalItem.snippet}
				heading={arcgisMapComponent?.map.portalItem.title}
				slot="logo"
				thumbnail={arcgisMapComponent?.map.portalItem.thumbnailUrl}
				href={arcgisMapComponent?.map.portalItem.itemPageUrl}
				label="Thumbnail of map"
			></calcite-navigation-logo>
			<calcite-dropdown
				close-on-select-disabled
				on:calciteDropdownSelect={handleOnCalciteDropdownSelect}
				slot="content-end"
			>
				<calcite-button data-testid="select-components" slot="trigger"
					>Select Components</calcite-button
				>
				<calcite-dropdown-group selection-mode="multiple">
					<calcite-dropdown-item
						data-component="arcgis-area-measurement-2d"
						data-testid="arcgis-area-measurement-2d-dropdown-item"
						icon-start="measure-area"
						label="Area Measurement 2D">Area Measurement 2D</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-basemap-gallery"
						data-testid="arcgis-basemap-gallery-dropdown-item"
						icon-start="basemap"
						label="Basemap Gallery">Basemap Gallery</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-basemap-layer-list"
						data-testid="arcgis-basemap-layer-list-dropdown-item"
						icon-start="layer-basemap"
						label="Basemap Layer List">Basemap Layer List</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-basemap-toggle"
						data-testid="arcgis-basemap-toggle-dropdown-item"
						icon-start="toggle"
						label="Basemap Toggle">Basemap Toggle</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-bookmarks"
						data-testid="arcgis-bookmarks-dropdown-item"
						icon-start="bookmark"
						label="Bookmarks">Bookmarks</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-compass"
						data-testid="arcgis-compass-dropdown-item"
						icon-start="compass"
						label="Compass">Compass</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-coordinate-conversion"
						data-testid="arcgis-coordinate-conversion-dropdown-item"
						icon-start="coordinate-system"
						label="Coordinate Conversion">Coordinate Conversion</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-directional-pad"
						data-testid="arcgis-directional-pad-dropdown-item"
						icon-start="move"
						label="Directional Pad">Directional Pad</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-directions"
						data-testid="arcgis-directions-dropdown-item"
						icon-start="fork-right"
						label="Directions">Directions</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-distance-measurement-2d"
						data-testid="arcgis-distance-measurement-2d-dropdown-item"
						icon-start="measure"
						label="Distance Measurement 2D">Distance Measurement 2D</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-editor"
						data-testid="arcgis-editor-dropdown-item"
						icon-start="pencil"
						label="Editor">Editor</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-home"
						data-testid="arcgis-home-dropdown-item"
						icon-start="home"
						label="Home">Home</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-layer-list"
						data-testid="arcgis-layer-list-dropdown-item"
						icon-start="layers"
						label="Layer List">Layer List</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-legend"
						data-testid="arcgis-legend-dropdown-item"
						icon-start="legend"
						label="Legend">Legend</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-locate"
						data-testid="arcgis-locate-dropdown-item"
						icon-start="gps-on"
						label="Locate">Locate</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-print"
						data-testid="arcgis-print-dropdown-item"
						icon-start="print"
						label="Print">Print</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-scale-bar"
						data-testid="arcgis-scale-bar-dropdown-item"
						icon-start="actual-size"
						label="Scale Bar">Scale Bar</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-scale-range-slider"
						data-testid="arcgis-scale-range-slider-dropdown-item"
						icon-start="select-range"
						label="Scale Range Slider">Scale Range Slider</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-search"
						data-testid="arcgis-search-dropdown-item"
						icon-start="search"
						label="Search">Search</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-sketch"
						data-testid="arcgis-sketch-dropdown-item"
						icon-start="annotate-tool"
						label="Sketch">Sketch</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-table-list"
						data-testid="arcgis-table-list-dropdown-item"
						icon-start="tables"
						label="Table List">Table List</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-time-slider"
						data-testid="arcgis-time-slider-dropdown-item"
						icon-start="clock"
						label="Time Slider">Time Slider</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-track"
						data-testid="arcgis-track-dropdown-item"
						icon-start="compass-north-circle"
						label="Track">Track</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-zoom"
						data-testid="arcgis-zoom-dropdown-item"
						icon-start="magnifying-glass-plus"
						label="Zoom">Zoom</calcite-dropdown-item
					>
				</calcite-dropdown-group>
			</calcite-dropdown>
		</calcite-navigation>
		<calcite-shell-panel slot="panel-start" position="start" resizable>
			<calcite-action-bar slot="action-bar">
				{#each selectedItems as item, index}
					<calcite-action
						data-testid={`${item.dataset.testid}-action`}
						on:click={() => (selectedItem = selectedItems[index])}
						on:keypress={() => (selectedItem = selectedItems[index])}
						tabindex="0"
						role="button"
						active={item.dataset.component === selectedItem?.dataset.component ? true : undefined}
						icon={item.iconStart}
						text={item.label}
					/>
				{/each}
			</calcite-action-bar>
			<div>
				{#if selectedItem}
					{#if selectedItem.dataset.component === 'arcgis-area-measurement-2d'}
						<arcgis-area-measurement-2d
							data-testid="arcgis-area-measurement-2d-component"
							reference-element="arcgis-map"
						></arcgis-area-measurement-2d>
					{:else if selectedItem.dataset.component === 'arcgis-basemap-gallery'}
						<arcgis-basemap-gallery
							data-testid="arcgis-basemap-gallery-component"
							reference-element="arcgis-map"
						></arcgis-basemap-gallery>
					{:else if selectedItem.dataset.component === 'arcgis-basemap-layer-list'}
						<arcgis-basemap-layer-list
							data-testid="arcgis-basemap-layer-list-component"
							reference-element="arcgis-map"
						></arcgis-basemap-layer-list>
					{:else if selectedItem.dataset.component === 'arcgis-basemap-toggle'}
						<arcgis-basemap-toggle
							data-testid="arcgis-basemap-toggle-component"
							reference-element="arcgis-map"
						></arcgis-basemap-toggle>
					{:else if selectedItem.dataset.component === 'arcgis-bookmarks'}
						<arcgis-bookmarks
							data-testid="arcgis-bookmarks-component"
							reference-element="arcgis-map"
						></arcgis-bookmarks>
					{:else if selectedItem.dataset.component === 'arcgis-compass'}
						<arcgis-compass data-testid="arcgis-compass-component" reference-element="arcgis-map"
						></arcgis-compass>
					{:else if selectedItem.dataset.component === 'arcgis-coordinate-conversion'}
						<arcgis-coordinate-conversion
							data-testid="arcgis-coordinate-conversion-component"
							reference-element="arcgis-map"
						></arcgis-coordinate-conversion>
					{:else if selectedItem.dataset.component === 'arcgis-directional-pad'}
						<arcgis-directional-pad
							data-testid="arcgis-directional-pad-component"
							reference-element="arcgis-map"
						></arcgis-directional-pad>
					{:else if selectedItem?.dataset.component === 'arcgis-directions'}
						<arcgis-directions
							api-key={import.meta.env.VITE_ARCGIS_API_KEY}
							reference-element="arcgis-map"
							use-default-route-layer
						></arcgis-directions>
					{:else if selectedItem.dataset.component === 'arcgis-distance-measurement-2d'}
						<arcgis-distance-measurement-2d
							data-testid="arcgis-distance-measurement-2d-component"
							reference-element="arcgis-map"
						></arcgis-distance-measurement-2d>
					{:else if selectedItem.dataset.component === 'arcgis-editor'}
						<arcgis-editor
							data-testid="arcgis-editor-component"
							on:arcgisReady={handleArcgisReadyEditor}
							reference-element="arcgis-map"
						></arcgis-editor>
					{:else if selectedItem.dataset.component === 'arcgis-home'}
						<arcgis-home data-testid="arcgis-home-component" reference-element="arcgis-map"
						></arcgis-home>
					{:else if selectedItem.dataset.component === 'arcgis-layer-list'}
						<arcgis-layer-list
							data-testid="arcgis-layer-list-component"
							reference-element="arcgis-map"
						></arcgis-layer-list>
					{:else if selectedItem.dataset.component === 'arcgis-legend'}
						<arcgis-legend data-testid="arcgis-legend-component" reference-element="arcgis-map"
						></arcgis-legend>
					{:else if selectedItem.dataset.component === 'arcgis-locate'}
						<arcgis-locate data-testid="arcgis-locate-component" reference-element="arcgis-map"
						></arcgis-locate>
					{:else if selectedItem.dataset.component === 'arcgis-print'}
						<arcgis-print data-testid="arcgis-print-component" reference-element="arcgis-map"
						></arcgis-print>
					{:else if selectedItem.dataset.component === 'arcgis-scale-bar'}
						<arcgis-scale-bar
							data-testid="arcgis-scale-bar-component"
							reference-element="arcgis-map"
						></arcgis-scale-bar>
					{:else if selectedItem.dataset.component === 'arcgis-scale-range-slider'}
						<arcgis-scale-range-slider
							data-testid="arcgis-scale-range-slider-component"
							on:arcgisReady={handleArcgisReadyScaleRangeSlider}
							reference-element="arcgis-map"
						></arcgis-scale-range-slider>
					{:else if selectedItem.dataset.component === 'arcgis-search'}
						<arcgis-search data-testid="arcgis-search-component" reference-element="arcgis-map"
						></arcgis-search>
					{:else if selectedItem.dataset.component === 'arcgis-sketch'}
						<arcgis-sketch data-testid="arcgis-sketch-component" reference-element="arcgis-map"
						></arcgis-sketch>
					{:else if selectedItem.dataset.component === 'arcgis-table-list'}
						<arcgis-table-list
							data-testid="arcgis-table-list-component"
							on:arcgisReady={handleArcgisReadyTableList}
							reference-element="arcgis-map"
						></arcgis-table-list>
					{:else if selectedItem.dataset.component === 'arcgis-time-slider'}
						<arcgis-time-slider
							data-testid="arcgis-time-slider-component"
							loop
							on:arcgisReady={handleArcgisReadyTimeSlider}
							reference-element="arcgis-map"
						></arcgis-time-slider>
					{:else if selectedItem.dataset.component === 'arcgis-track'}
						<arcgis-track data-testid="arcgis-track-component" reference-element="arcgis-map"
						></arcgis-track>
					{:else if selectedItem.dataset.component === 'arcgis-zoom'}
						<arcgis-zoom data-testid="arcgis-zoom-component" reference-element="arcgis-map"
						></arcgis-zoom>
					{/if}
				{/if}
			</div>
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
	:global(.esri-coordinate-conversion, .esri-scale-range-slider, .esri-time-slider) {
		max-width: 100%;
		min-width: 100%;
		width: 100%;
	}
	arcgis-map {
		flex: 1;
	}
</style>
