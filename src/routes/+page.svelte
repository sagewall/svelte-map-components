<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(async () => {
		await import('@arcgis/map-components/dist/components/arcgis-map');
		await import('@arcgis/map-components/dist/components/arcgis-scene');
		await import('@esri/calcite-components/dist/components/calcite-card');
		await import('@esri/calcite-components/dist/components/calcite-card-group');
		await import('@esri/calcite-components/dist/components/calcite-chip');
		await import('@esri/calcite-components/dist/components/calcite-link');
		await import('@esri/calcite-components/dist/components/calcite-navigation');
		await import('@esri/calcite-components/dist/components/calcite-navigation-logo');
		await import('@esri/calcite-components/dist/components/calcite-shell');

		mounted = true;
	});
</script>

{#if mounted}
	<calcite-shell>
		<calcite-navigation slot="header">
			<calcite-navigation-logo
				description="A SvelteKit App with ArcGIS Components"
				heading="ArcGIS Components"
				slot="logo"
				label="ArcGIS Components"
			></calcite-navigation-logo>
		</calcite-navigation>

		<calcite-card-group label="Parking zones">
			<calcite-card label="Map Components">
				<arcgis-map item-id="d5dda743788a4b0688fe48f43ae7beb9" slot="thumbnail"></arcgis-map>
				<span slot="heading">Map Components</span>
				<calcite-link href="/map" slot="description">Add components to a map</calcite-link>
			</calcite-card>

			<calcite-card label="Utility Network Components">
				<arcgis-map item-id="d5dda743788a4b0688fe48f43ae7beb9" slot="thumbnail"></arcgis-map>
				<span slot="heading">Utility Network Components</span>
				<calcite-link href="/utility-network" slot="description"
					>Add Utility Network components to a map</calcite-link
				>
			</calcite-card>

			<calcite-card label="Scene Components">
				<arcgis-scene item-id="adfad6ee6c6043238ea64e121bb6429a" slot="thumbnail"></arcgis-scene>
				<span slot="heading">Scene Components (Coming soon!)</span>
				<calcite-link disabled href="/scene" slot="description"
					>Add components to a scene</calcite-link
				>
			</calcite-card>
		</calcite-card-group>
	</calcite-shell>
{:else}
	<p>Loading...</p>
{/if}

<style>
	arcgis-map,
	arcgis-scene {
		height: 24em;
		width: 24em;
	}
</style>
