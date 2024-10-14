<script lang="ts">
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import '@esri/calcite-components/dist/calcite/calcite.css';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { setAssetPath } = await import('@esri/calcite-components/dist/components');
		setAssetPath('https://js.arcgis.com/calcite-components/2.13.1/assets');
	});
</script>

<slot></slot>
