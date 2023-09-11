<script lang="ts">
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import '@esri/calcite-components/dist/calcite/calcite.css';

	import type { Widget } from '$lib/types';
	import { defineCustomElements as defineMapElements } from '@arcgis/map-components/dist/loader';
	import { defineCustomElements as defineCalciteElements } from '@esri/calcite-components/dist/loader';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

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

	let selectedWidget = widgets[0];

	function selectWidget(widget: Widget) {
		selectedWidget = widget;
	}
</script>

<calcite-shell>
	<calcite-shell-panel slot="panel-start" position="start">
		<calcite-action-bar slot="action-bar">
			{#each widgets as widget}
				<calcite-action
					on:click={() => selectWidget(widget)}
					on:keypress={() => selectWidget(widget)}
					tabindex="0"
					role="button"
					active={widget.id === selectedWidget.id}
					icon={widget.icon}
					text={widget.text}
				/>
			{/each}
		</calcite-action-bar>

		{#if selectedWidget.id === 'arcgis-layer-list'}
			<arcgis-layer-list reference-element="arcgis-map" />
		{:else if selectedWidget.id === 'arcgis-legend'}
			<arcgis-legend reference-element="arcgis-map" />
		{:else if selectedWidget.id === 'arcgis-editor'}
			<arcgis-editor reference-element="arcgis-map" />
		{/if}
	</calcite-shell-panel>
	<arcgis-map item-id="459a495fc16d4d4caa35e92e895694c8" />
</calcite-shell>

<style>
	arcgis-map {
		flex: 1;
	}
</style>
