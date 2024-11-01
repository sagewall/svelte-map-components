<script lang="ts">
	import Point from '@arcgis/core/geometry/Point';
	import { onMount } from 'svelte';

	let arcgisMapComponent: HTMLArcgisMapElement | null = $state(null);
	let center: Point = $state(new Point());
	let mounted = $state(false);
	let selectedItem: HTMLCalciteDropdownItemElement | null = $state(null);
	let selectedItems: HTMLCalciteDropdownItemElement[] = $state([]);

	const latitude = $derived(center?.latitude.toFixed(2));
	const longitude = $derived(center?.longitude.toFixed(2));

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
		await import('@esri/calcite-components/dist/components/calcite-shell-panel');

		mounted = true;
	});

	function handleArcgisViewChange(event: CustomEvent) {
		center = (event.target as HTMLArcgisMapElement).center;
	}

	function handleArcgisViewReadyChange(event: CustomEvent) {
		arcgisMapComponent = event.target as HTMLArcgisMapElement;
	}

	function handleOnCalciteDropdownSelect(event: { target: HTMLCalciteDropdownElement }) {
		if (event.target) {
			selectedItems = event.target.selectedItems;

			selectedItems.forEach(async (item) => {
				switch (item.dataset.component) {
					case 'arcgis-utility-network-associations':
						await import(
							'@arcgis/map-components/dist/components/arcgis-utility-network-associations'
						);
						break;
					case 'arcgis-utility-network-trace':
						await import('@arcgis/map-components/dist/components/arcgis-utility-network-trace');
						break;
					case 'arcgis-utility-network-validate-topology':
						await import(
							'@arcgis/map-components/dist/components/arcgis-utility-network-validate-topology'
						);
						break;
					case 'arcgis-version-management':
						await import('@arcgis/map-components/dist/components/arcgis-version-management');
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
				description={arcgisMapComponent?.map.portalItem.snippet.split('.')[0]}
				heading={arcgisMapComponent?.map.portalItem.title}
				href={arcgisMapComponent?.map.portalItem.itemPageUrl}
				label="Thumbnail of map"
				slot="logo"
				thumbnail={arcgisMapComponent?.map.portalItem.thumbnailUrl}
			></calcite-navigation-logo>
			<calcite-dropdown
				close-on-select-disabled
				oncalciteDropdownSelect={handleOnCalciteDropdownSelect}
				slot="content-end"
			>
				<calcite-button data-testid="select-components" slot="trigger"
					>Select Components</calcite-button
				>
				<calcite-dropdown-group selection-mode="multiple">
					<calcite-dropdown-item
						data-component="arcgis-utility-network-associations"
						data-testid="arcgis-utility-network-associations-dropdown-item"
						icon-start="view-associations"
						label="Utility Network Associations">Utility Network Associations</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-utility-network-trace"
						data-testid="arcgis-utility-network-trace-dropdown-item"
						icon-start="trace"
						label="Utility Network Trace">Utility Network Trace</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-utility-network-validate-topology"
						data-testid="arcgis-utility-network-validate-topology-dropdown-item"
						icon-start="validate-utility-network-topology"
						label="Utility Network Validate Topology"
						>Utility Network Validate Topology</calcite-dropdown-item
					>
					<calcite-dropdown-item
						data-component="arcgis-version-management"
						data-testid="arcgis-version-management-dropdown-item"
						icon-start="code-branch"
						label="Version Management">Version Management</calcite-dropdown-item
					>
				</calcite-dropdown-group>
			</calcite-dropdown>
		</calcite-navigation>
		<calcite-shell-panel slot="panel-start" position="start" resizable width-scale="l">
			<calcite-action-bar slot="action-bar">
				{#each selectedItems as item, index}
					<calcite-action
						data-testid={`${item.dataset.testid}-action`}
						onclick={() => (selectedItem = selectedItems[index])}
						onkeypress={() => (selectedItem = selectedItems[index])}
						tabindex="0"
						role="button"
						active={item.dataset.component === selectedItem?.dataset.component ? true : undefined}
						icon={item.iconStart}
						text={item.label}
					></calcite-action>
				{/each}
			</calcite-action-bar>
			<div>
				{#if selectedItem}
					{#if selectedItem.dataset.component === 'arcgis-utility-network-associations'}
						<arcgis-utility-network-associations
							data-testid="arcgis-utility-network-associations-component"
							reference-element="arcgis-map"
						></arcgis-utility-network-associations>
					{:else if selectedItem.dataset.component === 'arcgis-utility-network-trace'}
						<arcgis-utility-network-trace
							data-testid="arcgis-utility-network-trace-component"
							reference-element="arcgis-map"
						></arcgis-utility-network-trace>
					{:else if selectedItem.dataset.component === 'arcgis-utility-network-validate-topology'}
						<arcgis-utility-network-validate-topology
							data-testid="arcgis-utility-network-validate-topology-component"
							reference-element="arcgis-map"
						></arcgis-utility-network-validate-topology>
					{:else if selectedItem.dataset.component === 'arcgis-version-management'}
						<arcgis-version-management
							data-testid="arcgis-version-management-component"
							reference-element="arcgis-map"
						></arcgis-version-management>
					{/if}
				{/if}
			</div>
		</calcite-shell-panel>
		<arcgis-map
			item-id="471eb0bf37074b1fbb972b1da70fb310"
			onarcgisViewChange={handleArcgisViewChange}
			onarcgisViewReadyChange={handleArcgisViewReadyChange}
		>
		</arcgis-map>
		{#if center}
			<calcite-shell-panel slot="panel-bottom">
				<div>
					Map Center: {longitude}° longitude {latitude}° latitude
				</div>
			</calcite-shell-panel>
		{/if}
	</calcite-shell>
{:else}
	<p>Loading...</p>
{/if}

<style>
	:global(.esri-un-associations__widget-container) {
		max-width: 100%;
		min-width: 100%;
		width: 100%;
	}

	arcgis-map {
		flex: 1;
	}
</style>
