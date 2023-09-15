<script lang="ts">
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import '@esri/calcite-components/dist/calcite/calcite.css';

	import type { Widget } from '$lib/types';
	import type FeatureLayer from '@arcgis/core/layers/FeatureLayer';
	import { defineCustomElements as defineMapElements } from '@arcgis/map-components/dist/loader';
	import { defineCustomElements as defineCalciteElements } from '@esri/calcite-components/dist/loader';

	defineCalciteElements(window, {
		resourcesUrl: 'https://js.arcgis.com/calcite-components/1.7.0/assets'
	});
	defineMapElements();

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
		},
		{
			icon: 'layers-editable',
			id: 'arcgis-editor',
			text: 'Editor'
		}
	];

	let arcgisLayerList: HTMLArcgisLayerListElement;
	let arcgisMap: HTMLArcgisMapElement;
	let selectedWidget = widgets[0];

	function handleLayerListReady() {
		const layerList = arcgisLayerList.widget;
		layerList.listItemCreatedFunction = listItemCreatedFuntion;
	}

	async function handleViewReady() {
		const mapView = arcgisMap.view;
		await mapView.when();

		const hazardAreasFeatureLayer = mapView.map.layers.find(
			(layer) => layer.title === 'Hazard Areas'
		) as FeatureLayer;

		const result = await hazardAreasFeatureLayer.queryFeatures();
		mapView.goTo(result.features);
	}

	function listItemCreatedFuntion(event: any) {
		const item = event.item;
		if (item.layer.type != 'group') {
			item.panel = {
				content: 'legend'
			};
		}
	}
</script>

<calcite-shell>
	<calcite-shell-panel slot="panel-start" position="start">
		<calcite-action-bar slot="action-bar">
			{#each widgets as widget}
				<calcite-action
					on:click={() => (selectedWidget = widget)}
					on:keypress={() => (selectedWidget = widget)}
					tabindex="0"
					role="button"
					active={widget.id === selectedWidget.id ? true : undefined}
					icon={widget.icon}
					text={widget.text}
				/>
			{/each}
		</calcite-action-bar>

		{#if selectedWidget.id === 'arcgis-layer-list'}
			<arcgis-layer-list
				bind:this={arcgisLayerList}
				on:widgetReady={handleLayerListReady}
				reference-element="arcgis-map"
			/>
		{:else if selectedWidget.id === 'arcgis-legend'}
			<arcgis-legend reference-element="arcgis-map" />
		{:else if selectedWidget.id === 'arcgis-editor'}
			<arcgis-editor reference-element="arcgis-map" />
		{/if}
	</calcite-shell-panel>
	<arcgis-map
		bind:this={arcgisMap}
		on:viewReady={handleViewReady}
		item-id="459a495fc16d4d4caa35e92e895694c8"
	/>
</calcite-shell>

<style>
	arcgis-map {
		flex: 1;
	}
</style>
