<script lang="ts">
	import type { Widget } from '$lib/types';
	import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
	import type Point from '@arcgis/core/geometry/Point';
	import type FeatureLayer from '@arcgis/core/layers/FeatureLayer';
	import type LayerList from '@arcgis/core/widgets/LayerList';
	import type WebMap from '@arcgis/core/WebMap';
	import type ListItem from '@arcgis/core/widgets/LayerList/ListItem';
	import type ListItemPanel from '@arcgis/core/widgets/LayerList/ListItemPanel';
	import {
		defineCustomElements as defineMapElements,
		type ArcgisLayerListCustomEvent,
		type ArcgisMapCustomEvent
	} from '@arcgis/map-components/dist/loader';
	import { defineCustomElements as defineCalciteElements } from '@esri/calcite-components/dist/loader';

	defineCalciteElements(window, {
		resourcesUrl: 'https://js.arcgis.com/calcite-components/2.0.0/assets'
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

	let activeWidget = widgets[0];
	let navigationLogo: HTMLCalciteNavigationLogoElement;
	let center: Point;

	function handleLayerListReady(
		event: ArcgisLayerListCustomEvent<{
			widget: LayerList;
		}>
	) {
		const layerList = event.detail.widget;
		layerList.listItemCreatedFunction = listItemCreatedFuntion;
		layerList.visibleElements.collapseButton = true;
		layerList.visibleElements.closeButton = true;
		layerList.visibleElements.filter = true;
		layerList.visibleElements.heading = true;
		layerList.filterPlaceholder = 'Filter layers';
	}

	async function handleViewReady(
		event: ArcgisMapCustomEvent<{
			view: __esri.MapView;
		}>
	) {
		const mapView = event.target.view;
		const map = mapView.map as WebMap;
		const { portalItem } = map;

		navigationLogo.heading = portalItem.title;
		navigationLogo.description = portalItem.snippet;
		navigationLogo.thumbnail = portalItem.thumbnailUrl;
		navigationLogo.href = portalItem.itemPageUrl;
		navigationLogo.label = 'Thumbnail of map';

		const hazardAreasFeatureLayer = mapView.map.layers.find(
			(layer) => layer.title === 'Hazard Areas'
		) as FeatureLayer;

		const result = await hazardAreasFeatureLayer.queryFeatures();
		mapView.goTo(result.features);

		reactiveUtils.watch(
			() => mapView.center,
			() => (center = mapView.center)
		);
	}

	function listItemCreatedFuntion(event: { item: ListItem }) {
		const { item } = event;
		if (item.layer.type != 'group') {
			item.panel = {
				content: 'legend'
			} as ListItemPanel;
		}
	}
</script>

<calcite-shell>
	<calcite-navigation slot="header">
		<calcite-navigation-logo bind:this={navigationLogo} slot="logo" />
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
			<arcgis-layer-list on:widgetReady={handleLayerListReady} reference-element="arcgis-map" />
		{:else if activeWidget.id === 'arcgis-legend'}
			<arcgis-legend reference-element="arcgis-map" />
		{:else if activeWidget.id === 'arcgis-editor'}
			<arcgis-editor reference-element="arcgis-map" />
		{/if}
	</calcite-shell-panel>

	{#if center}
		<shell-center-row>
			<div>
				Map Center: {center.longitude.toFixed(2)}° longitude {center.latitude.toFixed(2)}° latitude
			</div></shell-center-row
		>
	{/if}

	<arcgis-map on:viewReady={handleViewReady} item-id="459a495fc16d4d4caa35e92e895694c8" />
</calcite-shell>

<style>
	@import '@arcgis/core/assets/esri/themes/light/main.css';

	arcgis-map {
		flex: 1;
	}
</style>
