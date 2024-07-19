<script lang="ts">
	import map from '$lib/assets/map.png';
	import scene from '$lib/assets/scene.png';
	import utilityNetwork from '$lib/assets/utility-network.png';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(async () => {
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
				<img alt="A thumbnail of the map" class="thumbnail" src={map} slot="thumbnail" />
				<span slot="heading">Map Components</span>
				<calcite-link href="/map" slot="description">Add components to a map</calcite-link>
			</calcite-card>

			<calcite-card label="Scene Components">
				<img alt="A thumbnail of the scene" class="thumbnail" src={scene} slot="thumbnail" />
				<span slot="heading">Scene Components (Coming soon!)</span>
				<calcite-link disabled href="/scene" slot="description"
					>Add components to a scene</calcite-link
				>
			</calcite-card>

			<calcite-card label="Utility Network Components">
				<img
					alt="A thumbnail of the utility network map"
					class="thumbnail"
					src={utilityNetwork}
					slot="thumbnail"
				/>
				<span slot="heading">Utility Network Components</span>
				<calcite-link href="/utility-network" slot="description"
					>Add Utility Network components to a map</calcite-link
				>
			</calcite-card>
		</calcite-card-group>
	</calcite-shell>
{:else}
	<p>Loading...</p>
{/if}

<style>
	.thumbnail {
		height: 24em;
		width: 24em;
	}
</style>
