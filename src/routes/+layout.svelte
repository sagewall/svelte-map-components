<script lang="ts">
	import '@arcgis/core/assets/esri/themes/light/main.css';
	import '@esri/calcite-components/dist/calcite/calcite.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(async () => {
		const { setAssetPath } = await import('@esri/calcite-components/dist/components');
		setAssetPath(
			'https://cdn.jsdelivr.net/npm/@esri/calcite-components@3.0.0-next.90/dist/calcite/assets'
		);
	});
</script>

{@render children()}
