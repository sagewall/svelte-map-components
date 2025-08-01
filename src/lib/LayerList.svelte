<script lang="ts">
	import type Collection from '@arcgis/core/core/Collection';
	import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
	import {
		getCatalogLayerForLayer,
		isLayerFromCatalog
	} from '@arcgis/core/layers/catalog/catalogUtils';
	import CatalogLayer from '@arcgis/core/layers/CatalogLayer';
	import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
	import GroupLayer from '@arcgis/core/layers/GroupLayer';
	import KnowledgeGraphLayer from '@arcgis/core/layers/KnowledgeGraphLayer';
	import type Layer from '@arcgis/core/layers/Layer';
	import Map from '@arcgis/core/Map';
	import ActionButton from '@arcgis/core/support/actions/ActionButton';
	import ActionToggle from '@arcgis/core/support/actions/ActionToggle';
	import type { CatalogLayerView } from '@arcgis/core/views/layers/CatalogLayerView';
	import type ListItem from '@arcgis/core/widgets/LayerList/ListItem';
	import { onDestroy, onMount } from 'svelte';

	interface WatchHandle {
		remove: () => void;
	}

	interface TriggerActionEvent {
		action: ActionButton | ActionToggle;
		item: ListItem;
	}

	let { referenceElement } = $props();

	let catalogLayerListHandle: WatchHandle;
	let catalogLayerListSelectedItemsHandle: WatchHandle;
	let catalogLayerListTriggerHandle: WatchHandle;
	let highlightHandle: WatchHandle;
	let selectedItemsHandle: WatchHandle;
	let tableListSelectedItemsHandle: WatchHandle;
	let tableListTriggerHandle: WatchHandle;
	let mounted = $state(false);
	let layerList: HTMLArcgisLayerListElement | null = $state(null);

	const knowledgeGraphOptions = {
		filterPlaceholder: 'Filter tables',

		listItemCreatedFunction: (event: { item: ListItem }) => {
			const { item } = event;

			item.actionsSections = [
				[
					{
						icon: 'information',
						id: 'information',
						title: 'Show information'
					}
				]
			];
		},
		minFilterItems: 1,
		selectionMode: 'single',
		visibleElements: {
			errors: true,
			filter: true,
			statusIndicators: true
		}
	};

	onMount(async () => {
		await import('@arcgis/map-components/components/arcgis-layer-list');
		await import('@esri/calcite-components/components/calcite-button');
		await import('@esri/calcite-components/components/calcite-label');
		await import('@esri/calcite-components/components/calcite-switch');

		mounted = true;
	});

	onDestroy(() => {
		catalogLayerListHandle?.remove();
		catalogLayerListSelectedItemsHandle?.remove();
		catalogLayerListTriggerHandle?.remove();
		highlightHandle?.remove();
		selectedItemsHandle?.remove();
		tableListSelectedItemsHandle?.remove();
		tableListTriggerHandle?.remove();
	});

	function addCatalogLayer() {
		const catalogLayer = new CatalogLayer({
			url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Sanborn_maps_catalog/FeatureServer'
		});
		catalogLayer.dynamicGroupLayer.maximumVisibleSublayers = 20;
		referenceElement?.map.layers.add(catalogLayer);
	}

	function addKnowledgeGraphLayer() {
		const knowledgeGraphLayer = new KnowledgeGraphLayer({
			title: 'Phone calls',
			url: `https://sampleserver7.arcgisonline.com/server/rest/services/Hosted/PhoneCalls/KnowledgeGraphServer`
		});
		referenceElement?.map.layers.add(knowledgeGraphLayer);
	}

	async function addLayerFromDynamicGroup(layer: FeatureLayer) {
		const parentCatalogLayer = getCatalogLayerForLayer(layer);
		if (!parentCatalogLayer) {
			return;
		}
		const footprint = parentCatalogLayer.createFootprintFromLayer(layer);
		if (!footprint) {
			return;
		}
		const layerFromFootprint = await parentCatalogLayer.createLayerFromFootprint(footprint);
		referenceElement?.map.layers.add(layerFromFootprint);
	}

	function onarcgisReady(event: { target: HTMLArcgisLayerListElement }) {
		event.target?.selectedItems.on(
			'change',
			(event: { removed: Collection<ListItem>; added: Collection<ListItem> }) => {
				const { removed, added } = event;
				removed.forEach((item: ListItem) => {
					const { layer } = item;
					if (layer instanceof FeatureLayer) {
						layer.effect = 'none';
					}
				});
				added.forEach((item: ListItem) => {
					const { layer } = item;
					if (layer instanceof FeatureLayer) {
						layer.effect = 'drop-shadow(2px, 2px, 3px) saturate(250%)';
					}
				});
			}
		);

		selectedItemsHandle = reactiveUtils.watch(
			() => event.target?.selectedItems.at(0)?.layer as Layer,
			(layer: Layer) => layer && handleLayerSelection(layer)
		);

		catalogLayerListTriggerHandle = reactiveUtils.on(
			() => event.target?.catalogLayerList,
			'trigger-action',
			(event: TriggerActionEvent) => {
				if (event.action.id === 'add-layer') {
					if (!event.item.layer) {
						return;
					}

					layerList?.openedLayers.pop();

					addLayerFromDynamicGroup(event.item.layer as FeatureLayer);
					alert(`Added ${event.item.layer.title} to the map`);
				}

				if (event.action.id === 'zoom-to') {
					referenceElement?.goTo((event.item.layer as Layer).fullExtent);
				}
			}
		);

		catalogLayerListHandle = reactiveUtils.watch(
			() => event.target?.catalogLayerList,
			() => {
				if (highlightHandle) {
					highlightHandle.remove();
				}
			}
		);

		catalogLayerListSelectedItemsHandle = reactiveUtils.watch(
			() => event.target?.catalogLayerList?.selectedItems.at(0)?.layer as Layer,
			(layer: Layer) => {
				if (layer) {
					handleLayerSelection(layer);
				}
			}
		);

		tableListSelectedItemsHandle = reactiveUtils.watch(
			() => event.target?.tableList?.selectedItems.at(0)?.layer as Layer,
			(layer: Layer) => {
				if (layer) {
					handleLayerSelection(layer);
				}
			}
		);

		tableListTriggerHandle = reactiveUtils.on(
			() => event.target?.tableList,
			'trigger-action',
			(event: TriggerActionEvent) => {
				if (event.action.id === 'information') {
					alert(`${event.item.layer?.title}`);
				}
			}
		);
	}

	function onarcgisTriggerAction(event: { detail: { action: ActionButton; item: ListItem } }) {
		const { id } = event.detail.action;
		const { layer } = event.detail.item;

		const addGroupLayer = (parent: Map | GroupLayer, layers: Collection<Layer>) => {
			const groupLayer = new GroupLayer({
				title: 'New group layer'
			});
			const layerIndex = layers.findIndex((mapLayer) => layer === mapLayer);
			parent.add(groupLayer, layerIndex + 1);
			groupLayer.add(layer as Layer);
		};

		if (id === 'add-group-layer' && layer) {
			if (layer.parent instanceof GroupLayer) {
				addGroupLayer(layer.parent, layer.parent.layers);
			} else if (layer.parent instanceof Map) {
				addGroupLayer(layer.parent, referenceElement?.map.layers);
			}
		}

		if (id === 'zoom-to') {
			referenceElement?.goTo((layer as Layer).fullExtent);
		}
	}

	async function handleLayerSelection(layer: Layer) {
		console.log(layer.title, layer.type, layer.persistenceEnabled);

		if (isLayerFromCatalog(layer)) {
			const parentCatalogLayer = getCatalogLayerForLayer(layer);
			if (!parentCatalogLayer) {
				return;
			}
			const footprint = parentCatalogLayer.createFootprintFromLayer(layer);

			const layerView = (await referenceElement?.view.whenLayerView(
				parentCatalogLayer
			)) as CatalogLayerView;
			await reactiveUtils.whenOnce(() => !layerView.updating);

			highlightHandle?.remove();
			if (!footprint || !layerView.footprintLayerView) {
				return;
			}
			highlightHandle = layerView.footprintLayerView.highlight(footprint);
		}
	}

	async function listItemCreatedFunction(event: { item: ListItem }) {
		const { item } = event;
		const { layer } = item;

		if (layer) {
			try {
				await layer.load();
			} catch {
				console.log(`load failed for ${layer.title}`);
			}

			item.actionsSections = [[]];

			if (
				layer.type !== 'group' &&
				layer.type !== 'knowledge-graph' &&
				layer.type !== 'catalog' &&
				layer.type !== 'catalog-dynamic-group'
			) {
				item.panel = {
					content: 'legend'
				};
			}

			if (layer.type !== 'catalog-dynamic-group') {
				item.actionsSections.getItemAt(0)?.push(
					new ActionButton({
						title: 'Zoom to',
						icon: 'zoom-to-object',
						id: 'zoom-to'
					})
				);
			}

			if (
				!isLayerFromCatalog(layer as Layer) &&
				layer.type !== 'catalog-dynamic-group' &&
				layer.type !== 'catalog-footprint' &&
				layer.type !== 'knowledge-graph-sublayer'
			) {
				item.actionsSections.getItemAt(0)?.push(
					new ActionButton({
						title: 'Create group layer',
						icon: 'folder-new',
						id: 'add-group-layer'
					})
				);
			}

			if (isLayerFromCatalog(layer as Layer)) {
				item.actionsSections.getItemAt(0)?.push(
					new ActionButton({
						title: 'Add layer to map',
						icon: 'add-layer',
						id: 'add-layer'
					})
				);
			}
		}
	}

	function oncalciteSwitchChange(event: { target: { checked: boolean } }) {
		const { target } = event;
		if (!layerList) {
			return;
		}
		if (target.checked) {
			layerList.visibilityAppearance = 'checkbox';
		} else {
			layerList.visibilityAppearance = 'default';
		}
	}
</script>

{#if mounted}
	<calcite-button
		onclick={addCatalogLayer}
		onkeyup={(event: KeyboardEvent) => {
			if (event.key === 'Enter' || event.key === ' ') {
				addCatalogLayer();
				event.preventDefault();
			}
		}}
		role="button"
		tabindex="0"
	>
		Add CatalogLayer
	</calcite-button>
	<calcite-button
		onclick={addKnowledgeGraphLayer}
		onkeyup={(event: KeyboardEvent) => {
			if (event.key === 'Enter' || event.key === ' ') {
				addKnowledgeGraphLayer();
				event.preventDefault();
			}
		}}
		role="button"
		tabindex="0"
	>
		Add KnowledgeGraphLayer
	</calcite-button>
	<calcite-label layout="inline">
		<calcite-switch {oncalciteSwitchChange}></calcite-switch>
		Checkboxes
	</calcite-label>
	<arcgis-layer-list
		bind:this={layerList}
		data-testid="arcgis-layer-list-component"
		drag-enabled
		filter-placeholder="Filter layers"
		{knowledgeGraphOptions}
		{listItemCreatedFunction}
		{onarcgisReady}
		{onarcgisTriggerAction}
		{referenceElement}
		selection-mode="single"
		show-close-button
		show-collapse-button
		show-filter
		show-heading
	></arcgis-layer-list>
{:else}
	<p>Loading...</p>
{/if}

<style>
	calcite-button {
		margin: 0 0 0.5rem 0;
	}
</style>
