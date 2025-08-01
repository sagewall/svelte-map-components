<script lang="ts">
	import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
	import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
	import type Layer from '@arcgis/core/layers/Layer';
	import type SubtypeGroupLayer from '@arcgis/core/layers/SubtypeGroupLayer';
	import type Sublayer from '@arcgis/core/layers/support/Sublayer';
	import type SubtypeSublayer from '@arcgis/core/layers/support/SubtypeSublayer';
	import type ActionButton from '@arcgis/core/support/actions/ActionButton';
	import type ActionToggle from '@arcgis/core/support/actions/ActionToggle';
	import type ListItem from '@arcgis/core/widgets/TableList/ListItem';
	import { onDestroy, onMount } from 'svelte';

	interface TableListTriggerActionEvent {
		detail: {
			action: ActionButton | ActionToggle;
			item: ListItem;
		};
	}

	interface WatchHandle {
		remove: () => void;
	}

	let { referenceElement, featureTableElement } = $props();

	let mounted = $state(false);
	let selectedItemsHandle: WatchHandle;

	async function handleArcgisReady(event: CustomEvent) {
		const arcgisTableList = event.target as HTMLArcgisTableListElement;
		if (referenceElement?.map?.tables.length === 0) {
			const table = new FeatureLayer({ portalItem: { id: '6aa49be79248400ebd28f1d0c6af3f9f' } });
			await table.load();
			referenceElement?.map?.tables.add(table);
		}

		selectedItemsHandle = reactiveUtils.watch(
			() => arcgisTableList.selectedItems.at(0)?.layer,
			(layer) => layer && handleTableSelection(layer)
		);
	}

	function handleTableSelection(layer: Layer | Sublayer | SubtypeSublayer | SubtypeGroupLayer) {
		console.log('Selected table:', layer.title);
	}

	function handleTriggerAction(event: TableListTriggerActionEvent) {
		if (event.detail.action.id === 'information') {
			alert(`${event.detail.item.layer?.title}`);
		}

		if (event.detail.action.id === 'open-table') {
			if (featureTableElement) {
				featureTableElement.layer = event.detail.item.layer;
			} else {
				alert('Open the feature table first');
			}
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

			item.actionsSections = [
				[
					{
						icon: 'information',
						id: 'information',
						title: 'Show information'
					}
				],
				[
					{
						icon: 'table',
						id: 'open-table',
						title: 'Open table'
					}
				]
			];
		}
	}

	onMount(async () => {
		await import('@arcgis/map-components/components/arcgis-table-list');

		mounted = true;
	});

	onDestroy(() => {
		if (selectedItemsHandle) {
			selectedItemsHandle.remove();
		}
	});
</script>

{#if mounted}
	<arcgis-table-list
		data-testid="arcgis-table-list-component"
		drag-enabled
		filter-placeholder="Filter tables"
		{listItemCreatedFunction}
		min-drag-enabled-items={1}
		min-filter-items={1}
		onarcgisReady={handleArcgisReady}
		onarcgisTriggerAction={handleTriggerAction}
		reference-element="arcgis-map"
		selection-mode="single"
		show-close-button
		show-collapse-button
		show-filter
		show-heading
	></arcgis-table-list>
{:else}
	<p>Loading...</p>
{/if}
