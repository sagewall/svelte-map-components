<script lang="ts">
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import type Point from '@arcgis/core/geometry/Point';
	import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
	import type LayerView from '@arcgis/core/views/layers/LayerView';
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

	function handleArcgisReadyEditor() {
		const mapComponent = document.querySelector('arcgis-map');

		if (mapComponent) {
			const featureLayerIds = mapComponent.layerViews.map((layerView: LayerView) => {
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
					mapComponent.addLayer(new FeatureLayer({ portalItem: { id } }));
				}
			});
		}
	}

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
						data-component="arcgis-area-measurement-2d"
						icon-start="measure-area"
						label="Area Measurement 2D">Area Measurement 2D</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-basemap-gallery"
						icon-start="basemap"
						label="Basemap Gallery">Basemap Gallery</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-basemap-layer-list"
						icon-start="layer-basemap"
						label="Basemap Layer List">Basemap Layer List</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-basemap-toggle"
						icon-start="toggle"
						label="Basemap Toggle">Basemap Toggle</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-bookmarks"
						icon-start="bookmark"
						label="Bookmarks">Bookmarks</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-compass"
						icon-start="compass"
						label="Compass">Compass</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-coordinate-conversion"
						icon-start="coordinate-system"
						label="Coordinate Conversion">Coordinate Conversion</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-directional-pad"
						icon-start="move"
						label="Directional Pad">Directional Pad</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-distance-measurement-2d"
						icon-start="measure"
						label="Distance Measurement 2D">Distance Measurement 2D</calcite-dropdown-item
					>
					<calcite-dropdown-item data-component="arcgis-editor" icon-start="pencil" label="Editor"
						>Editor</calcite-dropdown-item
					>
					<calcite-dropdown-item data-component="arcgis-home" icon-start="home" label="Home"
						>Home</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-layer-list"
						icon-start="layers"
						label="Layer List">Layer List</calcite-dropdown-item
					>
					<calcite-dropdown-item data-component="arcgis-legend" icon-start="legend" label="Legend"
						>Legend</calcite-dropdown-item
					>
					<calcite-dropdown-item data-component="arcgis-locate" icon-start="gps-on" label="Locate"
						>Locate</calcite-dropdown-item
					>
					<calcite-dropdown-item data-component="arcgis-print" icon-start="print" label="Print"
						>Print</calcite-dropdown-item
					>
				</calcite-dropdown-group>
			</calcite-dropdown>
		</calcite-navigation>
		<calcite-shell-panel slot="panel-start" position="start" resizable>
			<calcite-action-bar slot="action-bar">
				{#each selectedItems as item, index}
					<calcite-action
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
						<arcgis-area-measurement-2d reference-element="arcgis-map"></arcgis-area-measurement-2d>
					{:else if selectedItem.dataset.component === 'arcgis-basemap-gallery'}
						<arcgis-basemap-gallery reference-element="arcgis-map"></arcgis-basemap-gallery>
					{:else if selectedItem.dataset.component === 'arcgis-basemap-layer-list'}
						<arcgis-basemap-layer-list reference-element="arcgis-map"></arcgis-basemap-layer-list>
					{:else if selectedItem.dataset.component === 'arcgis-basemap-toggle'}
						<arcgis-basemap-toggle reference-element="arcgis-map"></arcgis-basemap-toggle>
					{:else if selectedItem.dataset.component === 'arcgis-bookmarks'}
						<arcgis-bookmarks reference-element="arcgis-map"></arcgis-bookmarks>
					{:else if selectedItem.dataset.component === 'arcgis-compass'}
						<arcgis-compass reference-element="arcgis-map"></arcgis-compass>
					{:else if selectedItem.dataset.component === 'arcgis-coordinate-conversion'}
						<arcgis-coordinate-conversion reference-element="arcgis-map"
						></arcgis-coordinate-conversion>
					{:else if selectedItem.dataset.component === 'arcgis-directional-pad'}
						<arcgis-directional-pad reference-element="arcgis-map"></arcgis-directional-pad>
					{:else if selectedItem.dataset.component === 'arcgis-distance-measurement-2d'}
						<arcgis-distance-measurement-2d reference-element="arcgis-map"
						></arcgis-distance-measurement-2d>
					{:else if selectedItem.dataset.component === 'arcgis-editor'}
						<arcgis-editor on:arcgisReady={handleArcgisReadyEditor} reference-element="arcgis-map"
						></arcgis-editor>
					{:else if selectedItem.dataset.component === 'arcgis-home'}
						<arcgis-home reference-element="arcgis-map"></arcgis-home>
					{:else if selectedItem.dataset.component === 'arcgis-layer-list'}
						<arcgis-layer-list reference-element="arcgis-map"></arcgis-layer-list>
					{:else if selectedItem.dataset.component === 'arcgis-legend'}
						<arcgis-legend reference-element="arcgis-map"></arcgis-legend>
					{:else if selectedItem.dataset.component === 'arcgis-locate'}
						<arcgis-locate reference-element="arcgis-map"></arcgis-locate>
					{:else if selectedItem.dataset.component === 'arcgis-print'}
						<arcgis-print reference-element="arcgis-map"></arcgis-print>
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
	:global(.esri-coordinate-conversion.esri-widget) {
		width: 100%;
	}
	arcgis-map {
		flex: 1;
	}
</style>
