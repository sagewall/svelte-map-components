<script lang="ts">
	import '@esri/calcite-components/dist/calcite/calcite.css';
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import '@arcgis/map-components/arcgis-map-components/arcgis-map-components.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(async () => {
		const { setAssetPath } = await import('@esri/calcite-components/dist/components');
		setAssetPath(
			'https://cdn.jsdelivr.net/npm/@esri/calcite-components@3.0.0-next.123/dist/calcite/assets'
		);
	});
</script>

{@render children()}
