<script lang="ts">
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import '@arcgis/map-components/arcgis-map-components/arcgis-map-components.css';
	import '@esri/calcite-components/calcite/calcite.css';

	let { children } = $props();
</script>

{@render children()}
